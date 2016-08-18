import React from 'react'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import { Link, RouteHandler } from 'react-router'

export default class App extends React.Component {
	render() {
		return <div>{this.props.children}</div>
	}
}