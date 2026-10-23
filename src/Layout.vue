<script setup>
import Header from 'components/Header.vue'
import Footer from 'components/Footer.vue'
import Modal from 'components/Modal.vue'
</script>

<template lang="pug">
	doctype html
	html(lang="ru")
		head
			meta(charset="UTF-8")
			meta(name="viewport" content="width=device-width, initial-scale=1")
			meta(name="description" content=description)
			link(rel="stylesheet", href="https://cdn.jsdelivr.net/npm/swiper@12/swiper-bundle.min.css")
			script(defer, src="https://cdn.jsdelivr.net/npm/swiper@12/swiper-bundle.min.js")
			title= title

			if head
				!= head

		body
			Header
			main
				!= content
			Footer
			Modal
</template>