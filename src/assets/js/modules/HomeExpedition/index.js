import _ from 'underscore'
import React from 'react'
import Page from '../page'
import data from 'data'

export default class Index extends Page {
	render() {
		console.log(this.props)
		return (
			<div className="page home">
				<header>
					<div className="bg" style={{backgroundImage: 'url(images/' + this.props.background_mobile + ')'}}></div>
					<div className="bg bg-desktop" style={{backgroundImage: 'url(images/' + this.props.background + ')'}}></div>

					<h2>{this.props.expeditionTitle}<span>{this.props.subtitle}</span></h2>

					{this.props.image && 
						<div className="picture">
							<img src={"images/" + this.props.image} alt="" />

							{this.props.image_title && <span>{this.props.image_title}</span>}
						</div>
					}

					<div className="separator"></div>
				</header>

				<div className="content">
					<h2>{this.props.title}</h2>
					<div className="page-content" dangerouslySetInnerHTML={{__html: this.props.content}} />

					{this.getNextPageLink() != null && <p className="center"><a href={this.getNextPageLink()} className="btn">Suivant</a></p>}
				</div>

				<div className="clearfix"></div>
			</div>
		)
	}
}