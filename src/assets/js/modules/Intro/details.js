import React from 'react'
import { Link } from 'react-router'

export default class Details extends React.Component {
	render() {
		var firstView

		Object.keys(this.props.views).every((key) => {
			if (this.props.views[key].length > 0) {
				firstView = this.props.views[key][0].slug
				return false
			}
		})

		return <div>
			<div className="thumb" style={{backgroundImage: 'url(images/' + this.props.image_mobile + ')'}}></div>
			<div className="container">
				<h2>{this.props.name}</h2>
				<p>{this.props.intro}</p>
				<p align="center" className="discover"><Link to={"/expedition/" + this.props.slug + "/" + firstView} className="btn">Découverte</Link></p>
			</div>
		</div>
	}
}