import _ from 'underscore'
import page from 'page'
import React from 'react'
import Page from '../page'
import SectionTitle from '../sectionTitle'
import data from 'data'

export default class Interview extends Page {
	render() {
		return (
			<div className="page interview">
				<header>
					<div className="bg" style={{backgroundImage: 'url(images/' + this.props.header.background + ')'}}></div>

					<h2>{this.props.header.name}</h2>

					<div className="separator"></div>
				</header>

				<div className="content">
					<div className="content-container">
						<SectionTitle title={this.props.pageTitle} position={this.props.position + 1} />

						<h2>{this.props.title}</h2>
						<h3>{this.props.subtitle}</h3>
						<div className="page-content" dangerouslySetInnerHTML={{__html: this.props.content}} />

						{this.getNextPageLink() != null && <p className="center"><a href={this.getNextPageLink()} onClick={this.handleNextPageClick} className="btn">Suivant</a></p>}
					</div>
				</div>
			</div>
		)
	}
}