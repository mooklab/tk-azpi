<template lang="pug">

    mixin advantage(image, title, text)
        div.advantage
            div.icon
                img(src=image, alt=title)
            div.text
                span.title= title
                span.text= text

    section.advantages
        div.container
            h2 Наши преимущества
            div.list
                +advantage('assets/images/advantage_7.svg', 'Прямые поставки с завода АЗПИ', 'Получайте продукцию напрямую от производителя без лишних посредников')
                +advantage('assets/images/advantage_8.svg', 'Защита от контрафакта', 'Гарантируем поставку оригинальной продукции АЗПИ.')
                +advantage('assets/images/advantage_9.svg', 'Техническая поддержка', 'Помогаем подобрать продукцию и решить технические вопросы.')
                +advantage('assets/images/advantage_10.svg', 'Гарантия 100% оригинальности', 'Подтверждаем подлинность каждой поставляемой детали.')
                +advantage('assets/images/advantage_11.svg', 'Сертификаты соответствия', 'Вся продукция имеет необходимые подтверждающие документы.')
                +advantage('assets/images/advantage_12.svg', 'Работа по ФЗ-44, ФЗ-223', 'Обеспечиваем поставки с учетом требований государственных закупок.')

</template>

<style lang="sass" scoped>
    section.advantages
        margin-top: 60px
        margin-bottom: 60px
        +s(m)
            margin-top: 50px
            margin-bottom: 50px

        div.container
            display: grid
            grid-gap: 20px
        h2
            font-weight: 500
            font-size: 32px
            line-height: 130%
            
        div.list
            display: grid
            grid-template-columns: repeat(3, 1fr)
            grid-gap: 20px
            +s(m)
                grid-template-columns: repeat(2, 1fr)
                grid-gap: 15px

            div.advantage
                display: grid
                grid-template-columns: max-content 1fr
                grid-gap: 15px
                background: white
                border-radius: 16px
                padding: 10px
                +s(m)
                    grid-gap: 24px
                    grid-template-columns: 1fr
                    border-radius: 6px
                div.icon
                    display: grid
                    align-items: center
                    justify-items: center
                    width: 80px
                    height: 80px
                    border-radius: 16px
                    background: #059d891A
                    +s(m)
                        width: 35px
                        height: 35px
                        border-radius: 6px
                    img
                        +s(m)
                            width: 24px
                            height: 24px
                div.text
                    display: grid
                    grid-gap: 10px
                    margin-top: 10px
                    margin-bottom: 10px
                    +s(m)
                        margin: unset

                    span.title
                        font-weight: 500
                        line-height: 130%
                        +f(14px, 18px)
                    span.text
                        opacity: 0.7
                        +f(12px, 16px)
</style>