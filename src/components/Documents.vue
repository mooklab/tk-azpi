<script>

const swipers = new Map()

document.querySelectorAll('section.documents div.swiper').forEach(swiper => {
    const instance = new Swiper(swiper, {
        slidesPerView: 4,
        spaceBetween: 20,
        scrollbar: {
            el: swiper.parentElement.querySelector('.swiper-scrollbar-custom'),
            draggable: true,
        },
        breakpoints: {
            0: {
                slidesPerView: 1.815,
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

    swipers.set(swiper.closest('.slider'), instance)
})

document.querySelectorAll('.documents').forEach(section => {
    const years = section.querySelectorAll('.years span')
    const sliders = section.querySelectorAll('.sliders .slider')

    years.forEach((year, index) => {
        year.addEventListener('click', () => {
            years.forEach(item => item.classList.remove('active'))
            year.classList.add('active')

            sliders.forEach((slider, sliderIndex) => {
                slider.style.display = sliderIndex === index ? '' : 'none'

                if (sliderIndex === index) {
                    swipers.get(slider)?.update()
                }
            })
        })
    })

    sliders.forEach((slider, index) => {
        slider.style.display = index === 0 ? '' : 'none'
    })
})


</script>

<template lang="pug">

    mixin document(title)
        div.swiper-slide
            div.document
                img(src="assets/images/document.svg", alt=title).icon
                span.title= title
                div.download
                    a(href="#").icon
                        include ../assets/images/document_download.svg
                    span.size 0.64 МБ

    section.documents
        div.container
            h2 Документация и инструкции
            div.years
                div.wrap
                    span.active 2026
                    span 2025
                    span 2024
                    span 2023
                    span 2022
                    span 2021
                    span 2020
                    span 2019
                    span 2018
            div.sliders
                div.slider
                    div.swiper
                        div.swiper-wrapper
                            +document('Инф. письмо № 82 от 02.02.2026 распылитель 1379.1112110')
                            +document('Инф. письмо № 32 от 23.01.2026 о изменении стоимости продукции')
                    div.swiper-scrollbar-custom
                div.slider
                    div.swiper
                        div.swiper-wrapper
                            +document('Инф. письмо № 82 от 02.02.2026 распылитель 1379.1112110')
                            +document('Инф. письмо № 32 от 23.01.2026 о изменении стоимости продукции')
                            +document('Инф. письмо № 82 от 02.02.2026 распылитель 1379.1112110')
                            +document('Инф. письмо № 32 от 23.01.2026 о изменении стоимости продукции')
                            +document('Инф. письмо № 32 от 23.01.2026 о изменении стоимости продукции')
                    div.swiper-scrollbar-custom
                div.slider
                    div.swiper
                        div.swiper-wrapper
                            +document('Инф. письмо № 82 от 02.02.2026 распылитель 1379.1112110')
                            +document('Инф. письмо № 32 от 23.01.2026 о изменении стоимости продукции')
                            +document('Инф. письмо № 32 от 23.01.2026 о изменении стоимости продукции')
                    div.swiper-scrollbar-custom
                div.slider
                    div.swiper
                        div.swiper-wrapper
                            +document('Инф. письмо № 82 от 02.02.2026 распылитель 1379.1112110')
                            +document('Инф. письмо № 32 от 23.01.2026 о изменении стоимости продукции')
                    div.swiper-scrollbar-custom
                div.slider
                    div.swiper
                        div.swiper-wrapper
                            +document('Инф. письмо № 82 от 02.02.2026 распылитель 1379.1112110')
                            +document('Инф. письмо № 32 от 23.01.2026 о изменении стоимости продукции')
                            +document('Инф. письмо № 32 от 23.01.2026 о изменении стоимости продукции')
                    div.swiper-scrollbar-custom
                div.slider
                    div.swiper
                        div.swiper-wrapper
                            +document('Инф. письмо № 82 от 02.02.2026 распылитель 1379.1112110')
                            +document('Инф. письмо № 32 от 23.01.2026 о изменении стоимости продукции')
                    div.swiper-scrollbar-custom
                div.slider
                    div.swiper
                        div.swiper-wrapper
                            +document('Инф. письмо № 82 от 02.02.2026 распылитель 1379.1112110')
                            +document('Инф. письмо № 32 от 23.01.2026 о изменении стоимости продукции')
                            +document('Инф. письмо № 82 от 02.02.2026 распылитель 1379.1112110')
                            +document('Инф. письмо № 32 от 23.01.2026 о изменении стоимости продукции')
                            +document('Инф. письмо № 32 от 23.01.2026 о изменении стоимости продукции')
                    div.swiper-scrollbar-custom
                div.slider
                    div.swiper
                        div.swiper-wrapper
                            +document('Инф. письмо № 82 от 02.02.2026 распылитель 1379.1112110')
                            +document('Инф. письмо № 32 от 23.01.2026 о изменении стоимости продукции')
                    div.swiper-scrollbar-custom
                div.slider
                    div.swiper
                        div.swiper-wrapper
                            +document('Инф. письмо № 82 от 02.02.2026 распылитель 1379.1112110')
                            +document('Инф. письмо № 32 от 23.01.2026 о изменении стоимости продукции')
                    div.swiper-scrollbar-custom

</template>

<style lang="sass" scoped>
    section.documents
        margin-top: 60px
        margin-bottom: 60px
        +s(m)
            margin-top: 50px
            margin-bottom: 50px

        div.container
            display: grid
            h2
                font-weight: 500
                font-size: 32px
                line-height: 130%
                margin-bottom: 20px
            div.years
                width: 100%
                overflow-x: scroll
                &::-webkit-scrollbar
                    display: none

                div.wrap
                    display: grid
                    grid-auto-flow: column
                    grid-auto-columns: max-content
                    grid-gap: 20px
                    margin-bottom: 20px
                    width: max-content
                span
                    display: block
                    font-weight: 600
                    font-size: 14px
                    text-transform: uppercase
                    padding: 7px 10px
                    cursor: pointer
                    background: rgba(1, 87, 155, 0)
                    border-radius: 5px
                    transition: all 0.3s
                    &.active
                        background: rgba(1, 87, 155, 0.05)
                        color: #059d89
                    &:hover
                        background: rgba(1, 87, 155, 0.05)

            div.sliders
                display: grid
                div.slider
                    display: grid
                div.swiper
                    width: 100%
                    min-width: 0
                    +s(m)
                        overflow: visible
                    div.swiper-slide
                        div.document
                            display: grid
                            grid-template-rows: max-content 1fr max-content
                            min-height: 268px
                            background: white
                            border-radius: 16px
                            padding: 30px 20px
                            +s(m)
                                min-height: 220px
                                padding: 20px 15px
                                border-radius: 6px
                            img.icon
                               margin-bottom: 30px 
                            span.title
                                font-weight: 500
                                font-size: 18px
                                color: #191a29
                                +f(12px, 18px)
                            div.download
                                display: grid
                                align-items: center
                                grid-auto-flow: column
                                grid-auto-columns: max-content
                                justify-content: space-between
                                a.icon
                                    display: grid
                                    align-items: center
                                    justify-items: center
                                    border-radius: 10px
                                    width: 34px
                                    height: 34px
                                    background: #f5f9ff
                                    transition: all 0.5s
                                    +s(m)
                                        border-radius: 6px
                                    &:hover
                                        background: #1B2932
                                        svg
                                            path
                                                stroke: white

                                    svg
                                        path
                                            transition: all 0.5s
                                span.size
                                    color: #191a29
                                    opacity: 0.5
                div.swiper-scrollbar-custom
                    margin-top: 20px
</style>