import React from 'react'
import data from 'data'
import { Link } from 'react-router'

export default class BlockExpedition extends React.Component {

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
					<Link to={"expedition/" + this.props.slug + "/" + firstView} className="btn">Découverte</Link>
					<div className="clearfix"></div>
				</div>
			</div>
		</div>
	}
}