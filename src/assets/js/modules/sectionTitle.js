import React from 'react'

export default class SectionTitle extends React.Component {
	render() {
		return (
			<div className="section-title">
				<span className="number">{this.props.position < 10 ? "0" + this.props.position : this.props.position}</span>
				<span className="text">{this.props.title}</span>
				<span className="line small"></span>
				<span className="line big"></span>
			</div>
		)
	}
}