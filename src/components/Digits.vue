<template lang="pug">
    section.digits
        div.container
            div.advantage
                span.digit 20
                span.text лет на рынке #[br](с 2006 г.)
            div.advantage
                span.digit 700
                span.text SKU на #[br]складе
            div.advantage
                span.digit 300
                span.text уникальных #[br]клиентов в год
            div.advantage
                span.digit Доставка
                span.text по всей #[br]РФ и СНГ
            div.advantage
                span.digit 15
                span.text оптовых #[br]отгрузок в день
            div.advantage
                span.digit 200 м2
                span.text складского #[br]пространства
</template>

<style lang="sass" scoped>
    section.digits
        margin-top: 60px
        margin-bottom: 60px
        +s(m)
            margin-top: 50px
            margin-bottom: 50px

        div.container
            display: grid
            grid-template-columns: repeat(6, 1fr)
            background: #059D890D
            border-radius: 16px
            padding: 30px 0
            +s(l)
                grid-template-columns: repeat(3, 1fr)
                padding: 20px
            +s(m)
                grid-template-columns: repeat(2, 1fr)
                border-radius: 6px

            div.advantage
                position: relative
                display: grid
                grid-gap: 30px
                padding: 0 30px
                border-left: 1px solid #059D8933
                +s(l)
                    grid-gap: 20px
                    padding: 0
                    border-left: unset
                    border-right: 1px solid #059D8933
                    border-bottom: 1px solid #059D8933
                    padding-bottom: 15px
                    padding-left: 20px
                +s(m)
                    padding-top: 15px

                span.digit
                    font-weight: 500
                    color: #059d89
                    white-space: nowrap
                    +f(32px, 40px)
                    
                span.text
                    +f(12px, 16px)
                    opacity: 0.7

                &:nth-child(1)
                    border: unset
                    +s(l)
                        border-right: 1px solid #059D8933
                        border-bottom: 1px solid #059D8933

                &:nth-child(3n)
                    +s(l)
                        border-right: unset

                &:nth-last-child(-n + 3)
                    +s(l)
                        border-bottom: unset
                        padding-top: 15px

                &:nth-child(3n + 1)
                    +s(l)
                        padding-left: unset

                &:nth-child(2n)
                    +s(m)
                        border-right: none
                        padding-left: 20px

                &:nth-child(2n + 1)
                    +s(m)
                        border-right: 1px solid #059D8933
                        padding-left: unset

                &:not(:nth-last-child(-n + 2))
                    +s(m)
                        border-bottom: 1px solid #059D8933

                &:nth-child(1),
                &:nth-child(2)
                    +s(m)
                        padding-top: 5px 
                    
                    
                &:after
                    content: ''
                    position: absolute
                    right: -1px
                    bottom: 0
                    height: 15px
                    width: 1px
                    background: #ECF4F3

                &:before
                    content: ''
                    position: absolute
                    right: -1px
                    top: calc(100% + 1px)
                    height: 15px
                    width: 1px
                    background: #ECF4F3
                    z-index: 1
                    

</style>