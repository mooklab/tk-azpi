import fs from 'node:fs/promises'
import path from 'node:path'
import { createHash } from 'node:crypto'
import pug from 'pug'
import sass from 'sass'
import prettier from 'prettier'
import sirv from 'sirv'
import { parse, compileStyle } from 'vue/compiler-sfc'
import { parseFragment, serialize } from 'parse5'

export default function vueStatic(options = {}) {
    const root = process.cwd()
    const globalStyles = options.globalStyles ?? []

    const pagesDir = path.resolve(
        root,
        options.pagesDir || 'src/pages',
    )

    const layoutFile = options.layout
        ? path.resolve(root, options.layout)
        : null

    const pageMeta = options.pageMeta ?? {}

    const css = new Map()
    const js = new Map()
    const visited = new Set()

    // Создаёт постоянный идентификатор scoped-стилей.
    function scopeId(filename) {
        return (
            'data-v-' +
            createHash('sha1')
                .update(path.relative(root, filename))
                .digest('hex')
                .slice(0, 8)
        )
    }

    // Убирает общий отступ Sass, сохраняя вложенность.
    function dedent(source) {
        const lines = source
            .replace(/^\r?\n/, '')
            .replace(/\r?\n\s*$/, '')
            .split(/\r?\n/)

        const nonEmptyLines = lines.filter(line => line.trim())

        if (!nonEmptyLines.length) {
            return ''
        }

        const minIndent = Math.min(
            ...nonEmptyLines.map(
                line => line.match(/^[\t ]*/)[0].length,
            ),
        )

        return lines
            .map(line => (line.trim() ? line.slice(minIndent) : ''))
            .join('\n')
    }

    // Компилирует общие Sass-файлы в один CSS.
    async function compileGlobalStyles() {
        const results = await Promise.all(
            globalStyles.map(async file => {
                const filename = path.resolve(root, file)
                const source = await fs.readFile(filename, 'utf8')

                const result = sass.compileString(
                    dedent(source),
                    {
                        syntax: 'indented',
                        style: 'expanded',
                        url: new URL(`file://${filename}`),
                        loadPaths: [
                            path.resolve(root, 'src/assets/sass'),
                        ],
                    },
                )

                return result.css
            }),
        )

        return results.join('\n')
    }

    // Преобразует пути src/assets в assets/.
    function normalizeAssetPaths(html) {
        return html.replace(
            /(["'(])\/?src\/assets\//g,
            '$1assets/',
        )
    }

    // Позволяет использовать асинхронную функцию в String.replace().
    async function replaceAsync(source, regex, replacer) {
        const matches = [...source.matchAll(regex)]

        let result = ''
        let lastIndex = 0

        for (const match of matches) {
            result += source.slice(lastIndex, match.index)
            result += await replacer(...match)
            lastIndex = match.index + match[0].length
        }

        return result + source.slice(lastIndex)
    }

    // Рекурсивно ищет Vue-файлы страниц.
    async function findPages(dir) {
        const entries = await fs.readdir(dir, {
            withFileTypes: true,
        })

        const files = []

        for (const entry of entries) {
            const fullPath = path.join(dir, entry.name)

            if (entry.isDirectory()) {
                files.push(...(await findPages(fullPath)))
            } else if (
                entry.isFile() &&
                entry.name.endsWith('.vue')
            ) {
                files.push(fullPath)
            }
        }

        return files.sort()
    }

    // Добавляет scope ко всем HTML-элементам компонента.
    function addScope(html, id) {
        const fragment = parseFragment(html)

        function walk(node) {
            if (node.tagName) {
                node.attrs ||= []

                if (!node.attrs.some(attr => attr.name === id)) {
                    node.attrs.push({
                        name: id,
                        value: '',
                    })
                }
            }

            for (const child of node.childNodes || []) {
                walk(child)
            }

            if (node.content) {
                walk(node.content)
            }
        }

        walk(fragment)

        return serialize(fragment)
    }

    // Добавляет scope родителя только корневым элементам компонента.
    function addRootScope(html, id) {
        const fragment = parseFragment(html)

        const rootElements = fragment.childNodes.filter(
            node => node.tagName,
        )

        for (const element of rootElements) {
            element.attrs ||= []

            if (!element.attrs.some(attr => attr.name === id)) {
                element.attrs.push({
                    name: id,
                    value: '',
                })
            }
        }

        return serialize(fragment)
    }

    // Компилирует Vue-компонент в статический HTML.
    async function renderComponent(filename, props = {}) {
        filename = path.resolve(filename)

        if (visited.has(filename)) {
            throw new Error(`Circular component import: ${filename}`)
        }

        visited.add(filename)

        try {
            const source = await fs.readFile(filename, 'utf8')

            const { descriptor, errors } = parse(source, {
                filename,
            })

            if (errors.length) {
                throw errors[0]
            }

            if (!descriptor.template) {
                throw new Error(`Missing template: ${filename}`)
            }

            // 1. Компилируем Pug-шаблон.
            let html = descriptor.template.content

            if (descriptor.template.lang === 'pug') {
                html = pug.render(html, {
                    ...props,
                    filename,
                })
            }

            html = normalizeAssetPaths(html)

            // 2. Определяем scoped-стили.
            const id = scopeId(filename)

            const hasScopedStyle = descriptor.styles.some(
                style => style.scoped,
            )

            // Scope добавляется до подстановки дочерних компонентов.
            if (hasScopedStyle) {
                html = addScope(html, id)
            }

            // 3. Собираем script и script setup.
            let script = [
                descriptor.script?.content,
                descriptor.scriptSetup?.content,
            ]
                .filter(Boolean)
                .join('\n')

            // 4. Находим импорты Vue-компонентов.
            const imports = [
                ...script.matchAll(
                    /import\s+(\w+)\s+from\s+['"]([^'"]+\.vue)['"];?/g,
                ),
            ]

            // 5. Заменяем компоненты готовой HTML-разметкой.
            for (const [, name, importPath] of imports) {
                const childPath = path.resolve(
                    path.dirname(filename),
                    importPath,
                )

                const tag = new RegExp(
                    `<${name}\\b[^>]*>(?:[\\s\\S]*?<\\/${name}\\s*>)?`,
                    'gi',
                )

                html = await replaceAsync(
                    html,
                    tag,
                    async match => {
                        const fragment = parseFragment(match)

                        const element = fragment.childNodes.find(
                            node => node.tagName,
                        )

                        const childProps = Object.fromEntries(
                            (element?.attrs || []).map(
                                ({ name, value }) => [name, value],
                            ),
                        )

                        for (const [key, value] of Object.entries(childProps)) {
                            if (value === 'true') {
                                childProps[key] = true
                            } else if (value === 'false') {
                                childProps[key] = false
                            }
                        }

                        const childHtml = await renderComponent(
                            childPath,
                            childProps,
                        )

                        return hasScopedStyle
                            ? addRootScope(childHtml, id)
                            : childHtml
                    },
                )
            }

            // 6. Удаляем импорты .vue из JS.
            script = script.replace(
                /^\s*import\s+\w+\s+from\s+['"][^'"]+\.vue['"];?\s*$/gm,
                '',
            )

            if (script.trim()) {
                js.set(filename, script)
            }

            // 7. Компилируем стили компонента.
            for (const [index, style] of descriptor.styles.entries()) {
                let styleSource = style.content

                if (style.lang === 'sass') {
                    const result = sass.compileString(
                        `@use "mixins" as *\n${dedent(styleSource)}`,
                        {
                            syntax: 'indented',
                            style: 'expanded',
                            url: new URL(`file://${filename}`),
                            loadPaths: [
                                path.resolve(root, 'src/assets/sass'),
                            ],
                        },
                    )

                    styleSource = result.css
                }

                const result = compileStyle({
                    filename,
                    id,
                    source: styleSource,
                    scoped: style.scoped,
                })

                if (result.errors.length) {
                    throw result.errors[0]
                }

                css.set(`${filename}:${index}`, result.code)
            }

            return html
        } finally {
            visited.delete(filename)
        }
    }

    // Оборачивает HTML страницы в общий layout.
    async function renderLayout(content, pageFilename) {
        if (!layoutFile) {
            return content
        }

        const relativePage = path
            .relative(pagesDir, pageFilename)
            .split(path.sep)
            .join('/')

        const pageName = path.basename(pageFilename)

        const meta =
            pageMeta[relativePage] ??
            pageMeta[pageName] ??
            {}

        const title =
            meta.title ??
            (pageName === 'index.vue'
                ? 'MySite'
                : `${path.basename(pageFilename, '.vue')} — MySite`)

        return renderComponent(layoutFile, {
            content,
            title,
            description: meta.description ?? '',
            head: meta.head ?? '',
        })
    }

    // Создаёт документ или добавляет ресурсы в готовый layout.
    async function createDocument(
        pageHtml,
        styles = '',
        dev = false,
        scripts = '',
    ) {
        const styleTag = styles
            ? `<style>\n${styles}\n</style>`
            : ''

        const viteClient = dev
            ? '<script type="module" src="/@vite/client"></script>'
            : ''

        const scriptTag = scripts
            ? `<script type="module">\n${scripts}\n</script>`
            : ''

        // Layout уже содержит doctype, html, head и body.
        const hasLayout =
            layoutFile &&
            /<html(?:\s|>)/i.test(pageHtml) &&
            /<\/head\s*>/i.test(pageHtml) &&
            /<\/body\s*>/i.test(pageHtml)

        let document

        if (hasLayout) {
            const headAssets = [
                '<link rel="stylesheet" href="assets/global.css">',
                viteClient,
                styleTag,
            ]
                .filter(Boolean)
                .join('\n')

            document = pageHtml.replace(
                /<\/head\s*>/i,
                `${headAssets}\n</head>`,
            )

            document = document.replace(
                /<\/body\s*>/i,
                `${scriptTag}\n</body>`,
            )
        } else {
            // Старый режим, если layout не задан.
            document = `<!doctype html>
<html lang="ru">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<link rel="stylesheet" href="/assets/global.css">
${viteClient}
${styleTag}
</head>
<body>
${pageHtml}
${scriptTag}
</body>
</html>`
        }

        return prettier.format(document, {
            parser: 'html',
            printWidth: 100,
            tabWidth: 1,
            useTabs: true,
            htmlWhitespaceSensitivity: 'css',
        })
    }

    return {
        name: 'vue-static-sfc',

        enforce: 'pre',

        // DEV-СЕРВЕР.
        configureServer(server) {
            const reloadExtensions =
                /\.(vue|sass|scss|css|pug|js|json)$/

            const reload = file => {
                if (
                    file.startsWith(root + path.sep) &&
                    reloadExtensions.test(file)
                ) {
                    server.ws.send({
                        type: 'full-reload',
                    })
                }
            }

            server.watcher.on('change', reload)
            server.watcher.on('add', reload)
            server.watcher.on('unlink', reload)

            // Отдаём общий CSS.
            server.middlewares.use(
                '/assets/global.css',
                async (req, res, next) => {
                    try {
                        const globalCss = await compileGlobalStyles()

                        res.setHeader(
                            'Content-Type',
                            'text/css; charset=utf-8',
                        )

                        res.end(globalCss)
                    } catch (error) {
                        next(error)
                    }
                },
            )

            // Раздаём src/assets по URL /assets/.
            server.middlewares.use(
                '/assets',
                sirv(path.resolve(root, 'src/assets'), {
                    dev: true,
                    etag: true,
                }),
            )

            // Обрабатываем запросы к страницам.
            server.middlewares.use(
                async (req, res, next) => {
                    try {
                        const pathname = decodeURIComponent(
                            (req.url || '/').split('?')[0],
                        )

                        const relative =
                            pathname === '/'
                                ? 'index.vue'
                                : `${pathname.replace(/^\/+|\/+$/g, '')}.vue`

                        const filename = path.resolve(
                            pagesDir,
                            relative,
                        )

                        if (
                            filename !== pagesDir &&
                            !filename.startsWith(pagesDir + path.sep)
                        ) {
                            return next()
                        }

                        try {
                            await fs.access(filename)
                        } catch {
                            return next()
                        }

                        css.clear()
                        js.clear()

                        const pageContent = await renderComponent(filename)
                        const pageHtml = await renderLayout(
                            pageContent,
                            filename,
                        )

                        const styles = [...css.values()].join('\n')
                        const scripts = [...js.values()].join('\n;\n')

                        res.statusCode = 200
                        res.setHeader(
                            'Content-Type',
                            'text/html; charset=utf-8',
                        )

                        res.end(
                            await createDocument(
                                pageHtml,
                                styles,
                                true,
                                scripts,
                            ),
                        )
                    } catch (error) {
                        next(error)
                    }
                },
            )
        },

        // PRODUCTION: генерируем отдельный HTML для каждой страницы.
        async generateBundle() {
            const pages = await findPages(pagesDir)

            for (const page of pages) {
                css.clear()
                js.clear()

                const pageContent = await renderComponent(page)
                const pageHtml = await renderLayout(pageContent, page)

                const styles = [...css.values()].join('\n')
                const scripts = [...js.values()].join('\n;\n')

                const relativePath = path.relative(pagesDir, page)

                const outputPath = relativePath
                    .replace(/\.vue$/, '.html')
                    .split(path.sep)
                    .join('/')

                this.emitFile({
                    type: 'asset',
                    fileName: outputPath,
                    source: await createDocument(
                        pageHtml,
                        styles,
                        false,
                        scripts,
                    ),
                })
            }
        },

        // Копируем assets в dist/assets и записываем global.css.
        async writeBundle() {
            const sourceDir = path.resolve(root, 'src/assets')
            const outputDir = path.resolve(root, 'dist/assets')

            try {
                await fs.access(sourceDir)

                await fs.cp(sourceDir, outputDir, {
                    recursive: true,
                    force: true,
                    filter: source => {
                        const relative = path.relative(sourceDir, source)
                        return relative !== 'sass' && !relative.startsWith(`sass${path.sep}`)
                    },
                })

                const globalCss = await compileGlobalStyles()

                await fs.writeFile(
                    path.resolve(outputDir, 'global.css'),
                    globalCss,
                    'utf8',
                )
            } catch (error) {
                if (error.code !== 'ENOENT') {
                    throw error
                }
            }
        },
    }
}