import page from 'page'
import React from 'react'
import ReactDOM from 'react-dom'
import Intro from './modules/Intro'
import Single from './modules/Layouts/single'

export default (app) => {
	// Home
	page('/', (ctx) => {
		app.setPage(Intro)
	})

	// Pages
	page('/expedition/:slug/:pageSlug', (ctx) => {
		app.setPage(Single, {
			params: ctx.params
		})
	})

	page({
		click: false
	})
}