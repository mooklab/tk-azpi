<script>

document.querySelectorAll('[data-phone]').forEach(input => {
    input.addEventListener('input', () => {
        let value = input.value.replace(/\D/g, '')

        if (value.startsWith('8') || value.startsWith('7')) {
            value = value.slice(1)
        }

        value = value.slice(0, 10)

        let result = '+7'

        if (value.length) result += ' (' + value.slice(0, 3)
        if (value.length >= 4) result += ') ' + value.slice(3, 6)
        if (value.length >= 7) result += '-' + value.slice(6, 8)
        if (value.length >= 9) result += '-' + value.slice(8, 10)

        input.value = result
    })

    input.addEventListener('focus', () => {
        if (!input.value) input.value = '+7'
    })

    input.addEventListener('blur', () => {
        if (input.value === '+7') input.value = ''
    })
})

document.querySelector('form').addEventListener('submit', event => {
    const phone = event.target.querySelector('[data-phone]')

    if (phone && phone.value.replace(/\D/g, '').length !== 11) {
        event.preventDefault()
        phone.focus()
    }
})

</script>

<template lang="pug">
    section.callback
        div.container
            div.text
                h2 Не знаете, какое оборудование выбрать?
                span Оставьте контакты - мы подберем оптимальное решение и рассчитаем стоимость.
            form
                div.fields
                    label.input
                        input(type="email", name="name", placeholder="E-mail" required)
                        div
                            span.placeholder E-mail
                            span.required  *
                    label.input
                        input(type="tel", name="phone", placeholder="Телефон", data-phone, required)
                        div
                            span.placeholder Телефон
                            span.required  *
                label.checkbox
                    input(type="checkbox", name="personal")
                    div.tick
                        img(src="assets/images/tick.svg")
                    span Согласен на обработку #[a(href="#") персональных данных]
                button Получить консультацию инженера
</template>

<style lang="sass" scoped>
    section.callback
        margin-top: 60px
        margin-bottom: 60px
        +s(m)
            margin-top: 50px
            margin-bottom: 50px

        div.container
            display: grid
            grid-template-columns: repeat(2, 1fr)
            background: white
            padding: 30px 40px
            border-radius: 16px
            +s(m)
                grid-template-columns: 1fr
                grid-gap: 20px
                padding: 20px
            div.text
                display: grid
                align-content: start
                grid-gap: 20px
                max-width: 380px
                +s(m)
                    grid-gap: 10px
                h2
                    font-weight: 500
                    font-size: 32px
                span
                    opacity: 0.7
                    +f(12px, 16px)

        form
            max-width: 560px
            div.fields
                display: grid
                grid-gap: 10px
                margin-bottom: 12px

            label.input
                position: relative
                input
                    border: 1px solid rgba(0, 0, 0, 0.2)
                    border-radius: 5px
                    height: 44px
                    width: 100%
                    padding: 15px
                    color: black
                    &:focus + div
                        display: none
                    &:not(:placeholder-shown) + div
                        display: none
                    &::placeholder
                        opacity: 0


                div
                    position: absolute
                    top: 50%
                    left: 15px
                    transform: translateY(-50%)
                    pointer-events: none
                    span.placeholder
                        opacity: 0.5
                    span.required
                        color: #f00

            label.checkbox
                cursor: pointer
                font-weight: 400
                font-size: 12px
                color: rgba(0, 0, 0, 0.5)
                display: grid
                grid-template-columns: max-content 1fr
                grid-gap: 10px
                input
                    position: absolute
                    opacity: 0
                    pointer-events: none
                input:checked + div.tick img
                    opacity: 1
                div.tick
                    display: grid
                    align-items: center
                    justify-items: center
                    border: 1px solid rgba(0,0,0,0.2)
                    border-radius: 5px
                    width: 20px
                    height: 20px
                    margin-top: -3px
                    img
                        opacity: 0
                        transition: all 0.2s
                a
                    text-decoration: underline
                    text-decoration-skip-ink: none
                    color: #01579b
                    &:hover
                        text-decoration: none

            button
                cursor: pointer
                margin-top: 24px
                border-radius: 5px
                height: 40px
                background: #01579b
                font-weight: 500
                font-size: 14px
                line-height: 130%
                color: #fff
                padding: 10px 30px
                transition: all 0.5s
                +s(s)
                    width: 100%
                &:hover
                    background: #1B2932
</style>