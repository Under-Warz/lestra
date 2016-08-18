import React from 'react'
import { Router, Route, IndexRoute, useRouterHistory } from 'react-router'
import ReactDOM from 'react-dom'
import { createHistory } from 'history'
import data from 'data'
import App from './modules/Layouts/app'
import Home from './modules/Intro'
import SingleLayout from './modules/Layouts/single'

const history = useRouterHistory(createHistory)({
	basename: '/'
})

// Routes
const routes = {
	path: '/',
	component: App,
	indexRoute: { component: Home },
	childRoutes: [
		{
			component: SingleLayout,
			path: 'expedition/:slug/:viewSlug'
		}
	]
}

ReactDOM.render((
	<Router history={history} routes={routes} />
), document.getElementById('root'))