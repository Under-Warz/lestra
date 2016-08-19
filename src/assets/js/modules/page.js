import _ from 'underscore'
import React from 'react'
import data from 'data'

export default class Page extends React.Component {

	constructor(props) {
		super(props)

		this.getNextPageLink = this.getNextPageLink.bind(this)
	}

	handleNextPageClick(e) {
		page.show($(e.currentTarget).attr('href'))

		e.preventDefault()
		return false
	}

	getNextPageLink() {
		if (this.props.currentStep) {
			const expedition = _.findWhere(data.expeditions, {slug: this.props.slug})

			if (expedition) {
				const view = _.findWhere(expedition.views[this.props.currentStep], { slug: this.props.currentPage })
				const index = _.indexOf(expedition.views[this.props.currentStep], view)

				if (index < expedition.views[this.props.currentStep].length - 1) {
					return "expedition/" + this.props.slug + "/" + expedition.views[this.props.currentStep][index + 1].slug
				}
			}
		}

		return null
	}
}