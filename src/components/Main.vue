<script>
const mainSwiper = document.querySelector('section.main div.swiper')
new Swiper(mainSwiper, {
    spaceBetween: 20,
    autoHeight: true,
    loop: true,
    navigation: {
        prevEl: mainSwiper?.closest('section').querySelector('div.swiper-navigation div.arrow:first-child'),
        nextEl: mainSwiper?.closest('section').querySelector('div.swiper-navigation div.arrow:last-child')
    },
})
</script>

<template lang="pug">
    mixin slide(title)
        div.swiper-slide
            div.text
                h1= title
                p Комплексное снабжение торгующих организаций и дизельных сервисов топливной арматурой и запчастями для автомобилей Российского и Европейского производства
            div.buttons
                a(href="#").button.blue Запросить КП
                a(href="#").button Скачать каталог
                    img(src="assets/images/download.svg", alt="Скачать каталог")
                a(href="#").button Подобрать оборудование
                    img(src="assets/images/settings.svg", alt="Подобрать оборудование")
            img(src="assets/images/main_banner_background_desktop.webp").background.desktop
            img(src="assets/images/main_banner_background_mobile.webp").background.mobile

    mixin advantage(image, title)
        div.advantage
            div.icon
                img(src=image, alt=title)
            span= title
    
    section.main
        div.container
            div.swiper
                div.swiper-wrapper
                    +slide('Торговая компания АЗПИ')
                    +slide('Торговая компания АЗПИ 2')
                    +slide('Торговая компания АЗПИ 3')
            div.swiper-navigation
                div.arrow: img(src="assets/images/swiper_arrow.svg", alt="Назад")
                div.arrow: img(src="assets/images/swiper_arrow.svg", alt="Вперед")

    

    section.advantages
        div.container
            +advantage('assets/images/advantage_1.svg', 'Официальный дистрибьютор АЗПИ — гарантия оригинальности')
            +advantage('assets/images/advantage_2.svg', 'Импортозамещение Bosch/Denso')
            +advantage('assets/images/advantage_3.svg', 'Большой склад в Барнауле — всегда в наличии')
            +advantage('assets/images/advantage_4.svg', '700 SKU на складе')
            +advantage('assets/images/advantage_5.svg', 'Быстрая отгрузка по РФ и СНГ')
            +advantage('assets/images/advantage_6.svg', 'Гибкое ценообразование')

</template>

<style lang="sass" scoped>
    section.main
        margin-top: 40px
        margin-bottom: 30px
        +s(m)
            margin-top: 20px
            margin-bottom: 20px
        div.container
            position: relative
            display: grid
        div.swiper
            color: white
            min-width: 0
            width: 100%
            border-radius: 16px
            overflow: clip
            +s(m)
                border-radius: 6px
            
            div.swiper-slide
                display: grid
                align-content: start
                grid-gap: 32px
                position: relative
                min-height: 350px
                padding: 50px
                border-radius: 16px
                overflow: clip
                +s(m)
                    grid-gap: 24px
                    padding: 30px 20px
                    min-height: 600px
                    border-radius: 6px

                div.text
                    display: grid
                    grid-gap: 16px
                    max-width: 500px
                    z-index: 1

                    h1
                        font-weight: 500
                        +f(36px, 40px)

                    p
                        +f(12px, 16px)

                div.buttons
                    display: flex
                    flex-wrap: wrap
                    gap: 15px
                    z-index: 1
                    +s(m)
                        flex-direction: row
                        grid-gap: 10px

                    a.button
                        display: grid
                        align-items: center
                        justify-items: center
                        grid-auto-flow: column
                        grid-auto-columns: max-content
                        grid-gap: 7px
                        height: 40px
                        padding: 0 18px
                        border: 1px solid #fff
                        border-radius: 5px
                        transition: all 0.5s
                        +f(14px, 16px)
                        +s(m)
                            width: 100%
                            justify-content: center
                        &.blue
                            border-color: #01579b
                            background: #01579b

                        &:hover
                            background: #1B2932
                            border-color: #1B2932

                img.background
                    position: absolute
                    top: 0px
                    left: 0%
                    width: 100%
                    height: 100%
                    object-fit: cover
                    object-position: right center
                    z-index: -1
                    &.desktop
                        display: block
                        +s(m)
                            display: none
                    &.mobile
                        display: none
                        +s(m)
                            display: block
    section.advantages
        margin-top: 30px
        margin-bottom: 60px
        +s(m)
            margin-top: 20px
            margin-bottom: 50px
        div.container
            display: grid
            grid-template-columns: repeat(3, 1fr)
            grid-gap: 20px
            +s(m)
                grid-template-columns: repeat(2, 1fr)
                grid-gap: 15px
            div.advantage
                display: grid
                align-items: center
                grid-template-columns: max-content 1fr
                grid-gap: 15px
                background: white
                border-radius: 16px
                padding: 10px
                +s(m)
                    grid-template-columns: 1fr
                    padding: 10px 15px
                    grid-gap: 8px
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
                            transform: scale(0.5)
                span
                    +f(12px, 16px)

</style>