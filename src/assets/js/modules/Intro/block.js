import page from 'page'
import React from 'react'
import data from 'data'

export default class BlockExpedition extends React.Component {

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

		return <div className="expedition" style={{backgroundImage: 'url(images/' + this.props.picture + ')'}}>
			<a href="#" onClick={this.props.onClick !== undefined ? this.props.onClick : null}></a>
			<h2>{this.props.name}</h2>
			<div className="underline"></div>

			<div className="overlay"></div>

			<div className="number">
				<span className="small"></span>
				<span className="big"></span>
				<em>{this.props.index < 10 ? "0" + this.props.index : this.props.index}</em>
			</div>

			<div className="details">
				<div className="pagination"><span>{this.props.index < 10 ? "0" + this.props.index : this.props.index}<em>/</em></span>{data.expeditions.length < 10 ? "0" + data.expeditions.length : data.expeditions.length}</div>
				<div className="big-title">Expeditions</div>

				<div className="content">
					<h3>{this.props.name}</h3>
					<p>{this.props.intro}</p>
					<a href={"/expedition/" + this.props.slug + "/" + firstView} onClick={this.onClick} className="btn">Découverte</a>
					<div className="clearfix"></div>
				</div>
			</div>
		</div>
	}
}