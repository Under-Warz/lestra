import React from 'react'
import BlockExpedition from './block'
import Details from './details'
import Swiper from 'swiper'
import TweenMax from 'gsap'
import data from 'data'

export default class Home extends React.Component {

	construct() {
		this.handleClick = this.handleClick.bind(this)
		this.expendSlide = this.expendSlide.bind(this)
		this.fixSliderHeight = this.fixSliderHeight.bind(this)
	}

	componentDidMount() {
		// Init desktop slider
		this.slider = new Swiper(this.refs.slider, {
			slidesPerView: 4,
			breakpoints: {
				1023: {
					slidesPerView: 2
				}
			},
			preventClicks: true,
			prevButton: this.refs.sliderPrev,
			nextButton: this.refs.sliderNext,
			onClick: (swiper, event) => {
				$(swiper.clickedSlide).addClass('active')

				var origin = 0
				if (swiper.clickedIndex > 0) {
					var position = $(swiper.clickedSlide).offset()
					origin = position.left
				}

				this.expendSlide($(swiper.clickedSlide), origin, swiper.clickedIndex)
			}
		})

		// Fix slider desktop height
		this.fixSliderHeight()
		$(window).resize(this.fixSliderHeight.bind(this))

		// Desktop R/O
		var _this = this

		$(this.refs.slider).find('.swiper-slide').hover(function() {
			var line = $('.underline', this),
				overlay = $('.overlay', this),
				number = $('.number', this),
				smallLine = $('.small', number),
				bigLine = $('.big', number)

			TweenMax.to(line, 0.3, { width: 140, ease: Expo.easeInOut })
			TweenMax.to(overlay, 0.3, { opacity: 0, ease: Expo.easeInOut })
			TweenMax.to(number, 0.3, { opacity: 1, ease: Expo.easeInOut })
			TweenMax.to(smallLine, 0.3, { width: 40, ease: Expo.easeInOut })
			TweenMax.to(bigLine, 0.3, { height: 290, ease: Expo.easeInOut })
		}, function() {
			if (!$(this).hasClass('active') && !$(_this.refs.slider).hasClass('expended')) {
				var line = $('.underline', this),
					overlay = $('.overlay', this),
					number = $('.number', this),
					smallLine = $('.small', number),
					bigLine = $('.big', number)

				TweenMax.to(line, 0.3, { width: 0, ease: Expo.easeInOut })
				TweenMax.to(overlay, 0.3, { opacity: 0.6, ease: Expo.easeInOut })
				TweenMax.to(number, 0.3, { opacity: 0, ease: Expo.easeInOut })
				TweenMax.to(smallLine, 0.3, { width: 0, ease: Expo.easeInOut })
				TweenMax.to(bigLine, 0.3, { height: 0, ease: Expo.easeInOut })
			}
		})
	}

	componentDidUnmount() {
		this.slider = null
		this.detailsSlider = null
	}

	fixSliderHeight() {
		$(this.refs.slider).css('height', $(window).height())
	}

	handleClick(e, index) {
		$(this.refs.details).show()
		TweenMax.to($(this.refs.details), 0.5, { y: '-100%', ease: Expo.easeInOut })

		// Init mobile details slider
		this.detailsSlider = new Swiper(this.refs.sliderDetails, {
			initialSlide: index,
			slidesPerView: 1,
			prevButton: this.refs.detailsPrev,
			nextButton: this.refs.detailsNext
		})

		e.preventDefault()
		return false
	}

	// Expend slide to full view in desktop
	expendSlide(slide, origin, initIndex) {
		TweenMax.to($('h2', slide), 0.3, { opacity: 0, ease: Expo.easeInOut })
		TweenMax.to($('.underline', slide), 0.3, { opacity: 0, ease: Expo.easeInOut })
		TweenMax.to($('.number', slide), 0.3, { opacity: 0, ease: Expo.easeInOut })

		TweenMax.to(slide, 0.5, { width: $(window).width(), x: -origin, ease: Expo.easeInOut, onComplete:() => {
			$(this.refs.slider).addClass('expended')

			// Reset position
			TweenMax.set(slide, { clearProps: "transform" })

			// Reinit slider
			this.slider = new Swiper(this.refs.slider, {
				slidersPerView: 1,
				initialSlide: initIndex,
				prevButton: this.refs.sliderPrev,
				nextButton: this.refs.sliderNext
			})

			// Show details
			$('.details', slide).show()
			TweenMax.to($('.details', slide), 0.3, { opacity: 1, ease: Expo.easeInOut, onComplete:() => {
				$(this.refs.slider).addClass('show-details')
			} })
		} })

		// Remove slider
		setTimeout(() => {
			this.slider.destroy(true, false)
		}, 0)
	}

	render() {
		return <div id="home">
			<div id="listing">
				{data.expeditions.map((item, index) => {
					return <BlockExpedition onClick={(e) => this.handleClick(e, index)} {...item} picture={item.image_mobile} index={index + 1} key={index} />
				})}
			</div>
			<div id="slider">
				<div className="swiper-container" ref="slider">
					<div className="swiper-wrapper">
						{data.expeditions.map((item, index) => {
							return <div className="swiper-slide"><BlockExpedition {...item} picture={item.image} index={index + 1} key={index} /></div>
						})}
					</div>
					<a href="#" ref="sliderPrev" className="swiper-button-prev"><i></i> prev</a>
					<a href="#" ref="sliderNext" className="swiper-button-next"><i></i> next</a>
				</div>
			</div>

			<div id="details" ref="details">
				<div className="swiper-container" ref="sliderDetails">
					<div className="swiper-wrapper">
						{data.expeditions.map((item, index) => {
							return <div className="swiper-slide"><Details {...item} key={index} /></div>
						})}
					</div>
					<a href="#" ref="detailsPrev" className="swiper-button-prev"><i></i> prev</a>
					<a href="#" ref="detailsNext" className="swiper-button-next"><i></i> next</a>
				</div>
			</div>
		</div>
	}
}