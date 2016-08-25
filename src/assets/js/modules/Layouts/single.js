import _ from 'underscore'
import React from 'react'
import Timeline from '../Timeline'
import data from 'data'

export default class Single extends React.Component {

	constructor(props) {
		super(props)

		// Get page data
		const expedition = _.findWhere(data.expeditions, {slug: props.params.slug})
		var page, position
		Object.keys(expedition.views).every((key, index) => {
			page = _.findWhere(expedition.views[key], { slug: props.params.pageSlug })
			if (page !== undefined) {
				position = expedition.views[key].indexOf(page)

				if (index > 0) {
					for (var i = 0; i < index; i++) {
						position += expedition.views[key].length
					}
				}
			}

			return page === undefined
		})

		// Get current step
		var step
		Object.keys(expedition.views).every((key) => {
			if (_.findWhere(expedition.views[key], { slug: this.props.params.pageSlug })) {
				step = key
				return false
			}
			else {
				return true
			}
		})

		this.state = {
			expedition: expedition,
			timeline: expedition.views,
			step: step,
			page: page,
			position: position
		}
	}

	componentDidMount() {
		if (this.state.page.module) {
			require.ensure([], (require) => {
				this.module = require("../" + this.state.page.module + "/index.js").default

				this.forceUpdate()
			})
		}
	}

	render() {
		if (this.module == null) {
			return null
		}

		var Page = this.module

		return <div id="single" className={"custom-" + this.state.expedition.slug + "-" + this.state.page.slug}>
			<Page {...this.state.page.props} pageTitle={this.state.page.title} expeditionTitle={this.state.expedition.name} slug={this.props.params.slug} currentStep={this.state.step} currentPage={this.props.params.pageSlug} position={this.state.position} />
			<Timeline slug={this.props.params.slug} views={this.state.timeline} currentStep={this.state.step} currentPage={this.props.params.pageSlug} />
		</div>
	}
}