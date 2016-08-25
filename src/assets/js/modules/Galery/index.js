import _ from 'underscore'
import page from 'page'
import React from 'react'
import Page from '../page'
import data from 'data'
import Packery from 'packery'
import SectionTitle from '../sectionTitle'
import Details from '../Details'

export default class Galery extends Page {

	constructor(props) {
		super(props)

		this.state = {
			details: []
		}
	}

	componentDidMount() {
		setTimeout(() => {
			this.grid = new Packery(this.refs.grid, {
				itemSelector: '.grid-item',
				gutter: 0,
				percentPosition: true
			})
		})
	}

	handleShowDetails(e) {
		const details = this.props.grid[$(this.refs.grid).find('.grid-item').index($(e.currentTarget).parent())].details

		this.setState({
			details: details
		})

		e.preventDefault()
		return false
	}

	handleCloseDetails() {
		this.setState({
			details: []
		})
	}

	render() {
		return (
			<div className="page galery">
				<header>
					{this.props.grid && 
						<div className="grid" ref="grid">
							{this.props.grid.map((item) => {
								var size = ""
								var sizeDesktop = item.size ? item.size.split('x') : null
								var sizeMobile = item.size_mobile ? item.size_mobile.split('x') : null

								// Mobile size class
								if (sizeMobile != null) {
									if (parseInt(sizeMobile[0]) > 1) {
										size += " grid-item-mobile--width" + sizeMobile[0]
									}

									if (parseInt(sizeMobile[1]) > 1) {
										size += " grid-item-mobile--height" + sizeMobile[1]
									}
								}
								else {
									size += " hide-mobile"
								}

								// Desktop size class
								if (sizeDesktop != null) {
									if (parseInt(sizeDesktop[0]) > 1) {
										size += " grid-item--width" + sizeDesktop[0]
									}

									if (parseInt(sizeDesktop[1]) > 1) {
										size += " grid-item--height" + sizeDesktop[1]
									}
								}
								else {
									size += " hide-desktop"
								}

								return (
									<div className={"grid-item" + size} style={{backgroundImage: 'url(images/' + item.image + ')'}}>
										{item.details && <a href="#" onClick={this.handleShowDetails.bind(this)}><i className="icon icon-plus"></i></a>}
									</div>
								)
							})}
						</div>
					}

					<div className="separator"></div>
				</header>

				<div className="content">
					<div className="content-container">
						<SectionTitle title={this.props.pageTitle} position={this.props.position + 1} />

						<h2>{this.props.title}</h2>
						<div className="page-content" dangerouslySetInnerHTML={{__html: this.props.content}} />

						{this.getNextPageLink() != null && <p className="center"><a href={this.getNextPageLink()} onClick={this.handleNextPageClick} className="btn">Suivant</a></p>}
					</div>
				</div>

				{this.state.details.length > 0 && <Details items={this.state.details} handleClose={this.handleCloseDetails.bind(this)} />}
			</div>
		)
	}
}