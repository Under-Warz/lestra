import page from 'page'
import React from 'react'

export default class Details extends React.Component {

	onClick(e) {
		page.show($(e.currentTarget).attr('href'))

		e.preventDefault()
		return false
	}

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
				<p align="center" className="discover"><a href={"/expedition/" + this.props.slug + "/" + firstView} onClick={this.onClick} className="btn">Découverte</a></p>
			</div>
		</div>
	}
}