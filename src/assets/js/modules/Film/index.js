import _ from 'underscore'
import page from 'page'
import React from 'react'
import ReactDOM from 'react-dom'
import SectionTitle from '../sectionTitle'
import videojs from 'video.js'

export default class Film extends React.Component {

	componentDidMount() {
		this.initVideoJS()
	}

	componentWillUnmount() {
		if (this.video) {
			videojs('video').dispose()
			this.video = null
		}
	}

	initVideoJS() {
    const techOrder = ["html5"]

  	this.video = videojs('video', {
  		controls: true,
  		autoplay: false,
  		techOrder: techOrder
  	}, () => {
      this.player = this

      $(ReactDOM.findDOMNode(this)).find('video').on('play', () => {
      	$(ReactDOM.findDOMNode(this)).addClass('played')
      })
    })
  }

	render() {
		return (
			<div className="page film">
				<SectionTitle title={this.props.pageTitle} position={this.props.position + 1} />

				<h2 dangerouslySetInnerHTML={{__html: this.props.title}} />

				<video id="video" className="video-js" preload="auto" width="100%" height="100%" poster={"images/" + this.props.poster}>
					{Object.keys(this.props.sources).map((type) => {
						return <source src={"videos/" + this.props.sources[type]}  type={type}/>
					})}
				</video>
			</div>
		)
	}
}