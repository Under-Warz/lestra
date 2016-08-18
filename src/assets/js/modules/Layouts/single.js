import _ from 'underscore'
import React from 'react'
import Timeline from '../Timeline'
import data from 'data'

export default class Single extends React.Component {

	constructor(props) {
		super(props)

		// Get page data
		const expedition = _.findWhere(data.expeditions, {slug: props.params.slug})
		var page
		Object.keys(expedition.views).every((key) => {
			page = _.findWhere(expedition.views[key], { slug: props.params.viewSlug })
			if (page) return false
		})

		// Get current step
		var step
		Object.keys(expedition.views).every((key) => {
			if (_.findWhere(expedition.views[key], { slug: this.props.params.viewSlug })) {
				step = key
				return false
			}
		})

		this.state = {
			expedition: expedition.name,
			timeline: expedition.views,
			step: step,
			page: page
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

		return <div id="single">
			<Page {...this.state.page.props} expeditionTitle={this.state.expedition} slug={this.props.params.slug} currentStep={this.state.step} currentPage={this.props.params.viewSlug} />
			<Timeline slug={this.props.params.slug} views={this.state.timeline} currentStep={this.state.step} currentPage={this.props.params.viewSlug} />
		</div>
	}
}