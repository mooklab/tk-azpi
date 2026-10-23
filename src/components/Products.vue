<script>
const productsSwiper = document.querySelector('section.products div.swiper')
new Swiper(productsSwiper, {
    slidesPerView: 5,
    spaceBetween: 20,
    navigation: {
        prevEl: productsSwiper?.closest('section').querySelector('div.swiper-navigation div.arrow:first-child'),
        nextEl: productsSwiper?.closest('section').querySelector('div.swiper-navigation div.arrow:last-child')
    },
    scrollbar: {
        el: productsSwiper.closest('section').querySelector('.swiper-scrollbar-custom'),
        draggable: true,
    },
    breakpoints: {
        0: {
            slidesPerView: 1.815,
            spaceBetween: 15,
        },
        640: {
            slidesPerView: 3,
            spaceBetween: 15,
        },
        960: {
            slidesPerView: 4,
            spaceBetween: 20,
        },
        1280: {
            slidesPerView: 5,
            spaceBetween: 20,
        }
    }
})
</script>

<template lang="pug">

    mixin slide(image, title)
        div.swiper-slide
            a(href="#").product
                img(src=image, alt=title).preview
                span.title= title
                div.details
                    span.stock В наличии
                    span.code Арт: NS01-10812
                div.price
                    span.price 14 484 ₽/шт
                    button: img(src="assets/images/cart.svg")


    section.products
        div.container

            div.title
                h2 Популярные товары
                a(href="#") Весь каталог

            div.slider
                div.swiper
                    div.swiper-wrapper
                        +slide('assets/images/product.webp', 'Форсунка А‑04‑027‑00‑00‑00')
                        +slide('assets/images/product.webp', 'Форсунка А‑04‑027‑00‑00‑00')
                        +slide('assets/images/product.webp', 'Форсунка А‑04‑027‑00‑00‑00')
                        +slide('assets/images/product.webp', 'Форсунка А‑04‑027‑00‑00‑00')
                        +slide('assets/images/product.webp', 'Форсунка А‑04‑027‑00‑00‑00')
                        +slide('assets/images/product.webp', 'Форсунка А‑04‑027‑00‑00‑00')
                        +slide('assets/images/product.webp', 'Форсунка А‑04‑027‑00‑00‑00')
                        +slide('assets/images/product.webp', 'Форсунка А‑04‑027‑00‑00‑00')
                        +slide('assets/images/product.webp', 'Форсунка А‑04‑027‑00‑00‑00')

                div.swiper-scrollbar-custom

                div.swiper-navigation
                    div.arrow: img(src="assets/images/swiper_arrow.svg", alt="Назад")
                    div.arrow: img(src="assets/images/swiper_arrow.svg", alt="Вперед")

</template>

<style lang="sass" scoped>
    section.products
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
                a.product
                    display: grid
                    background: white
                    padding: 20px
                    border-radius: 16px
                    overflow: clip
                    border: 1px solid rgba(0,0,0,0)
                    transition: border 0.3s
                    +s(m)
                        padding: 15px
                        border-radius: 6px

                    img.preview
                        width: 100%
                        aspect-ratio: 7 / 6
                        object-fit: contain
                    span.title
                        font-weight: 500
                        margin-bottom: 12px
                        +f(14px, 16px)
                        +s(m)
                            margin-bottom: 5px

                    div.details
                        display: grid
                        grid-template-columns: 1fr max-content
                        justify-content: space-between
                        grid-gap: 10px
                        margin-bottom: 30px
                        +s(m)
                            margin-bottom: 10px
                            grid-template-columns: 1fr
                            grid-gap: unset

                        span.stock
                            white-space: nowrap
                            line-height: 143%
                            color: #09c53c
                            +f(12px, 14px)

                        span.code
                            line-height: 143%
                            color: #b8b8b8
                            +f(12px, 14px)

                    div.price
                        display: grid
                        grid-template-columns: 1fr max-content
                        align-items: center
                        span.price
                            font-weight: 600
                            line-height: 120%
                            color: #000
                            +f(16px, 20px)
                            
                        button
                            cursor: pointer
                            display: grid
                            align-items: center
                            justify-items: center
                            border-radius: 5px
                            width: 40px
                            height: 40px
                            background: #059d89
                            transition: all 0.5s
                            +s(m)
                                width: 35px
                                height: 35px

                            &:hover
                                background: #1B2932
                    &:hover
                        border-color: rgba(0,0,0,0.2)

        div.swiper-scrollbar-custom
            margin-top: 20px
</style>