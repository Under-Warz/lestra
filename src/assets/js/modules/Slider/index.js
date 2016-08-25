import _ from 'underscore'
import page from 'page'
import React from 'react'
import Page from '../page'
import data from 'data'
import Swiper from 'swiper'
import SectionTitle from '../sectionTitle'

export default class Slider extends Page {

	constructor(props) {
		super(props)

		this.initSlider = this.initSlider.bind(this)
		this.handlePrev = this.handlePrev.bind(this)
		this.handleNext = this.handleNext.bind(this)
		this.fixSliderHeight = _.throttle(this.fixSliderHeight.bind(this), 2000)
		this.managePagination = this.managePagination.bind(this)
	}

	componentDidMount() {
		// Init desktop slider
		setTimeout(() => {
			this.initSlider()

			// Fix slider desktop height
			this.fixSliderHeight()
			$(window).on('resize', this.fixSliderHeight)
		})
	}

	componentWillUnmount() {
		if (this.slider) {
			this.slider.destroy(true)
			this.slider = null
		}

		$(window).off('resize', this.fixSliderHeight)
	}

	initSlider() {
		var slidesPerView = 3
		this.breakpoint = "desktop"

		if ($(window).width() < 767) {
			this.breakpoint = "mobile"
			slidesPerView = 1
		}
		else if ($(window).width() < 1280) {
			this.breakpoint = "tablet"
			slidesPerView = 2
		}

		this.slider = new Swiper(this.refs.slider, {
			slidesPerView: slidesPerView,
			preventLinks: true,
			calculateHeight: true,
			onFirstInit: (swiper) => {
				this.managePagination(swiper, slidesPerView)
			},
			onSlideReset: (swiper) => {
				this.managePagination(swiper, slidesPerView)
			},
			onSlideChangeEnd: (swiper, direction) => {
				this.managePagination(swiper, slidesPerView)
			}
		})
	}

	fixSliderHeight() {

		// Reinit slider
		var newBreakpoint
		if ($(window).width() < 767) {
			newBreakpoint = "mobile"
		}
		else if ($(window).width() < 1280) {
			newBreakpoint = "tablet"
		}
		else {
			newBreakpoint = "desktop"
		}

		// Reinit
		if (newBreakpoint != this.breakpoint && this.slider) {
			this.slider.destroy(true)
			this.slider = null

			this.initSlider()
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

	managePagination(swiper, numberOfSlides) {
		const activeIndex = swiper.activeIndex
		const slides = $(this.refs.slider).find('.swiper-slide').length

		var maxToShow = numberOfSlides

		if (activeIndex == 0 || slides < maxToShow) {
			$(this.refs.prev).hide()
		}
		else {
			$(this.refs.prev).show()
		}

		if (Math.ceil(slides / maxToShow) == 1 || (activeIndex + maxToShow) == slides) {
			$(this.refs.next).hide()
		}
		else {
			$(this.refs.next).show()	
		}
	}

	render() {
		return (
			<div className="page slider">
				<header>
					<div className="bg" style={{backgroundImage: 'url(images/' + this.props.header.background_mobile + ')'}}></div>
					<div className="bg bg-desktop" style={{backgroundImage: 'url(images/' + this.props.header.background + ')'}}></div>

					<h2>{this.props.expeditionTitle}<span>{this.props.header.title}</span></h2>

					<div className="separator"></div>
				</header>

				<div className="content">
					<SectionTitle title={this.props.pageTitle} position={this.props.position + 1} />

					<h2>{this.props.pageTitle}</h2>

					{this.props.items &&
						<div className="slider">
							<div className="swiper-container" ref="slider">
								<div className="swiper-wrapper">
									{this.props.items.map((item) => {
										return <div className="swiper-slide">
											<div className="slide-container">
												<h3><span className="text">{item.title}</span><span className="line"></span></h3>

												<img src={"images/" + item.image} alt="" />

												<div className="description" dangerouslySetInnerHTML={{__html: item.content}} />
												<div className="clearfix"></div>

												{item.mention && <div className="bottom">
													<span className="text">{item.mention}</span>
													<span className="line line-v"></span>
													<span className="line line-h"></span>
												</div>}
											</div>
										</div>
									})}
									<div className="clearfix"></div>
								</div>
							</div>

							<a href="#" ref="prev" onClick={(e) => this.handlePrev(e)} className="swiper-button-prev"><i className="icon icon-slider-prev"></i></a>
							<a href="#" ref="next" onClick={(e) => this.handleNext(e)} className="swiper-button-next"><i className="icon icon-slider-next"></i></a>
						</div>
					}

					{this.getNextPageLink() != null && <p className="center"><a href={this.getNextPageLink()} onClick={this.handleNextPageClick} className="btn">Suivant</a></p>}
				</div>
			</div>
		)
	}
}