<script>
const articleSwiper = document.querySelector('section.news div.swiper')
new Swiper(articleSwiper, {
    slidesPerView: 3,
    spaceBetween: 20,
    scrollbar: {
        el: articleSwiper.closest('section').querySelector('.swiper-scrollbar-custom'),
        draggable: true,
    },
    breakpoints: {
        0: {
            slidesPerView: 1.25,
            spaceBetween: 15,
            freeMode: true,
        },
        640: {
            slidesPerView: 3,
            spaceBetween: 15,
            freeMode: true,
        },
        960: {
            slidesPerView: 4,
            spaceBetween: 20,
            freeMode: false,
        },
    },
})
</script>

<template lang="pug">

    mixin article(image, title, date)
        div.swiper-slide
            a(href="#").article
                span.title= title
                span.date= date
                img(src=image, alt=title) 

    section.news
        div.container
            div.title
                h2 Новости
                a(href="#") Все новости
            div.slider
                div.swiper
                    div.swiper-wrapper
                        +article('assets/images/article_1.webp', 'График работы в праздничный период', '19 декабря 2025')
                        +article('assets/images/article_1.webp', 'Оптимизация ремкомплектов и запчастей для ТНВД А-08-004-00-00-01', '14 ноября 2025')
                        +article('assets/images/article_1.webp', 'Новые поступления', '15 сентября 2025')
                        +article('assets/images/article_1.webp', 'График работы в праздничный период', '19 декабря 2025')
                        +article('assets/images/article_1.webp', 'Оптимизация ремкомплектов и запчастей для ТНВД А-08-004-00-00-01', '14 ноября 2025')
                        +article('assets/images/article_1.webp', 'Новые поступления', '15 сентября 2025')
                div.swiper-scrollbar-custom

</template>

<style lang="sass" scoped>
    section.news
        margin-top: 60px
        margin-bottom: 60px
        +s(m)
            margin-top: 50px
            margin-bottom: 50px

        div.container
            display: grid
            grid-gap: 20px

            div.title
                display: grid
                grid-template-columns: 1fr max-content
                align-items: end
                grid-gap: 20px

                h2
                    font-weight: 500
                    font-size: 32px
                    line-height: 130%
                    color: #000

                a
                    font-weight: 500
                    font-size: 14px
                    line-height: 130%
                    text-decoration: underline
                    text-decoration-skip-ink: none
                    color: #01579b
                    +s(m)
                        display: none
                    &:hover
                        text-decoration: none

            div.slider
                display: grid

            div.swiper
                width: 100%
                min-width: 0
                color: white
                border-radius: 16px
                overflow: clip
                +s(m)
                    overflow: visible
                    border-radius: 6px

                a.article
                    position: relative
                    display: grid
                    align-content: end
                    grid-gap: 20px
                    aspect-ratio: 4 / 3
                    border-radius: 16px
                    overflow: clip
                    padding: 20px
                    +s(m)
                        grid-gap: 10px
                        border-radius: 6px
                        min-height: 220px
                        aspect-ratio: unset

                    span.title
                        position: relative
                        font-weight: 500
                        line-height: 120%
                        z-index: 3
                        +f(16px, 20px)

                    span.date
                        position: relative
                        line-height: 114%
                        color: rgba(255, 255, 255, 0.8)
                        z-index: 3
                        +f(12px, 14px)

                    img
                        position: absolute
                        top: 50%
                        left: 50%
                        width: 100%
                        height: 100%
                        z-index: 1
                        object-fit: cover
                        object-position: center center
                        transform: translate(-50%, -50%)
                        transition: all 0.3s

                    &:before
                        content: ''
                        position: absolute
                        top: 0
                        left: 0
                        width: 100%
                        height: 100%
                        background: linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.5) 100%)
                        z-index: 2
                    &:hover
                        img
                            width: calc(100% + 20px)
                            height: calc(100% + 20px)

            div.swiper-scrollbar-custom
                margin-top: 20px

</style>