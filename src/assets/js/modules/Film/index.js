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

    var _this = this

  	this.video = videojs('video', {
  		controls: true,
  		autoplay: false,
  		techOrder: techOrder
  	}, function() {
      _this.player = this

      this.on('play', () => {
      	$(ReactDOM.findDOMNode(_this)).addClass('played')
      })

      this.on('ended', () => {
      	$(ReactDOM.findDOMNode(_this)).removeClass('played')
      })
    })
  }

  handleClose(e) {
  	if (this.player) {
  		this.player.pause()
  	}

  	$(ReactDOM.findDOMNode(this)).removeClass('played')

  	e.preventDefault()
  	return false
  }

	render() {
		return (
			<div className="page film">
				<a href="#" className="btn-close" onClick={this.handleClose.bind(this)}><i className="icon icon-close"></i></a>
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