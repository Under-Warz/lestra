import _ from 'underscore'
import page from 'page'
import React from 'react'
import ReactDOM from 'react-dom'
import Swiper from 'swiper'

export default class Details extends React.Component {

	componentDidMount() {
		// Init desktop slider
		setTimeout(() => {
			this.slider = new Swiper(this.refs.slider, {
				slidesPerView: 1,
				preventClicks: true,
				prevButton: this.refs.prev,
				nextButton: this.refs.next
			})
		})

		// Animate
		TweenMax.to($(ReactDOM.findDOMNode(this)), .5, { y: '-100%', ease: Expo.easeInOut })
	}

	componentWillUnmount() {
		if (this.slider) {
			this.slider.destroy(true, true)
			this.slider = null
		}
	}

	handleClose(e) {
		// Animate
		TweenMax.to($(ReactDOM.findDOMNode(this)), .5, { y: '0%', ease: Expo.easeInOut, onComplete:() => {
			this.props.handleClose()
		} })

		e.preventDefault()
		return false
	}

	render() {
		var slides = this.props.items.map((item) => {
			return <div className="swiper-slide" style={{backgroundImage: 'url(images/' + item + ')'}}></div>
		})

		return (
			<div className="page details">
				<a href="#" className="btn-close" onClick={this.handleClose.bind(this)}><i className="icon icon-close"></i></a>
				<div className="swiper">
					<div className="swiper-container" ref="slider">
						<div className="swiper-wrapper">
							{slides}
						</div>
					</div>

					<a href="#" ref="prev" className="swiper-button-prev"><i className="icon icon-slider-prev"></i></a>
					<a href="#" ref="next" className="swiper-button-next"><i className="icon icon-slider-next"></i></a>
				</div>
			</div>
		)
	}
}