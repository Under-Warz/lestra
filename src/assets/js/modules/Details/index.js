import _ from 'underscore'
import page from 'page'
import React from 'react'
import ReactDOM from 'react-dom'
import Swiper from 'swiper'

export default class Details extends React.Component {

	constructor(props) {
		super(props)

		this.managePagination = this.managePagination.bind(this)
		this.handlePrev = this.handlePrev.bind(this)
		this.handleNext = this.handleNext.bind(this)
	}

	componentDidMount() {
		// Init desktop slider
		setTimeout(() => {
			this.slider = new Swiper(this.refs.slider, {
				slidesPerView: 1,
				onFirstInit: (swiper) => {
					this.managePagination(swiper)
				},
				onSlideReset: (swiper) => {
					this.managePagination(swiper)
				},
				onSlideChangeEnd: (swiper, direction) => {
					this.managePagination(swiper)
				}
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

	managePagination(swiper) {
		const activeIndex = swiper.activeIndex
		const slides = $(this.refs.slider).find('.swiper-slide').length

		if (activeIndex == 0 || slides < 2) {
			$(this.refs.prev).hide()
		}
		else {
			$(this.refs.prev).show()
		}

		if (activeIndex == (slides - 1) || slides < 2) {
			$(this.refs.next).hide()
		}
		else {
			$(this.refs.next).show()	
		}
	}

	handlePrev(e) {
		if (this.slider) {
			this.slider.swipePrev(true)
		}

		e.preventDefault()
		return false
	}

	handleNext(e) {
		if (this.slider) {
			this.slider.swipeNext(true)
		}

		e.preventDefault()
		return false
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

					<a href="#" ref="prev" className="swiper-button-prev" onClick={(e) => this.handlePrev(e)}><i className="icon icon-slider-prev"></i></a>
					<a href="#" ref="next" className="swiper-button-next" onClick={(e) => this.handleNext(e)}><i className="icon icon-slider-next"></i></a>
				</div>
			</div>
		)
	}
}