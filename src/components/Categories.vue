<script>
const categorySwiper = document.querySelector('section.categories div.swiper')

new Swiper(categorySwiper, {
    slidesPerView: 6,
    spaceBetween: 15,

    navigation: {
        prevEl: categorySwiper.closest('section').querySelector('.swiper-navigation .arrow:first-child'),
        nextEl: categorySwiper.closest('section').querySelector('.swiper-navigation .arrow:last-child'),
    },

    scrollbar: {
        el: categorySwiper.closest('section').querySelector('.swiper-scrollbar-custom'),
        draggable: true,
    },

    breakpoints: {
        0: {
            slidesPerView: 'auto',
            spaceBetween: 15,
            slidesPerGroup: 1,
            grid: {
                rows: 2,
                fill: 'row',
            },
            freeMode: true,
            navigation: false,
        },

        960: {
            slidesPerView: 4,
            spaceBetween: 20,
            grid: {
                rows: 1,
            },
            freeMode: false,
            navigation: {
                prevEl: categorySwiper.closest('section').querySelector('.swiper-navigation .arrow:first-child'),
                nextEl: categorySwiper.closest('section').querySelector('.swiper-navigation .arrow:last-child'),
            },
        },

        1280: {
            slidesPerView: 6,
            spaceBetween: 20,
            grid: {
                rows: 1,
            },
        },
    }
})
</script>

<template lang="pug">

    mixin slide(image, title)
        div.swiper-slide
            a(href="#").category
                span= title
                img(src=image, alt=title)

    section.categories
        div.container

            div.title
                h2 Популярные категории
                a(href="#") Весь каталог

            div.slider
                div.swiper
                    div.swiper-wrapper
                        +slide('assets/images/category_1.webp', 'Секции ТНВД')
                        +slide('assets/images/category_2.webp', 'Традиционные системы впрыска')
                        +slide('assets/images/category_3.webp', 'Форсунки')
                        +slide('assets/images/category_4.webp', 'Распылители форсунок')
                        +slide('assets/images/category_5.webp', 'ТНВД')
                        +slide('assets/images/category_6.webp', 'Ремкомплекты')
                        +slide('assets/images/category_6.webp', 'Ремкомплекты')
                        +slide('assets/images/category_5.webp', 'ТНВД')
                        +slide('assets/images/category_4.webp', 'Распылители форсунок')
                        +slide('assets/images/category_3.webp', 'Форсунки')
                        +slide('assets/images/category_2.webp', 'Традиционные системы впрыска')
                        +slide('assets/images/category_1.webp', 'Секции ТНВД')

                div.swiper-scrollbar-custom

                div.swiper-navigation
                    div.arrow: img(src="assets/images/swiper_arrow.svg", alt="Назад")
                    div.arrow: img(src="assets/images/swiper_arrow.svg", alt="Вперед")

                button Весь каталог

</template>

<style lang="sass" scoped>
    section.categories
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
            position: relative

        div.swiper
            width: 100%
            min-width: 0
            border-radius: 16px
            overflow: clip
            +s(m)
                overflow: visible
                border-radius: 6px

            div.swiper-slide
                height: auto
                +s(m)
                    width: 148px
                    height: 148px
                a.category
                    display: grid
                    background: white
                    padding: 20px
                    aspect-ratio: 1 / 1
                    border-radius: 16px
                    overflow: clip
                    border: 1px solid rgba(0,0,0,0)
                    transition: border 0.3s
                    +s(m)
                        width: 148px
                        height: 148px
                        padding: 15px
                        border-radius: 6px
                    span
                        font-weight: 500
                        font-size: 18px
                        z-index: 1
                        +f(14px, 18px)
                    img
                        position: absolute
                        top: 1px
                        left: 1px
                        width: calc(100% - 2px)
                        height: calc(100% - 2px)
                        object-fit: cover
                        object-position: center center
                        border-radius: 16px
                        +s(m)
                            border-radius: 6px
                    &:hover
                        border-color: rgba(0,0,0,0.2)
        div.swiper-scrollbar-custom
            margin-top: 14px
            margin-bottom: 24px
        
        button
            cursor: pointer
            display: none
            align-items: center
            justify-items: center
            border: 1px solid #01579b
            border-radius: 5px
            height: 40px
            font-weight: 500
            font-size: 14px
            color: #01579b
            transition: all 0.5s
            +s(m)
                display: grid

            &:hover
                background: #1B2932
                color: white
</style>