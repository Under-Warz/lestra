import _ from 'underscore'
import React from 'react'
import ReactDOM from 'react-dom'
import BlockExpedition from './block'
import Details from './details'
import Swiper from 'swiper'
import TweenMax from 'gsap'
import data from 'data'

export default class Home extends React.Component {

	construct() {
		this.handleClick = this.handleClick.bind(this)
		this.expendSlide = this.expendSlide.bind(this)
		this.initSlider = this.initSlider.bind(this)
		this.managePagination = this.managePagination.bind(this)
		this.manageFullSliderPagination = this.manageFullSliderPagination.bind(this)
		this.fixSliderHeight = _.throttle(this.fixSliderHeight.bind(this), 2000)
		this.handleSliderPrev = this.handleSliderPrev.bind(this)
		this.handleSliderNext = this.handleSliderNext.bind(this)
		this.showIntro = this.showIntro.bind(this)
	}

	componentDidMount() {
		// Init desktop slider
		setTimeout(() => {
			this.initSlider()

			// Fix slider desktop height
			this.fixSliderHeight()
			$(window).on('resize', this.fixSliderHeight)

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
		}, 0)

		// Show popup
		this.showIntro();
	}

	initSlider() {
		var numberOfSlides = 4
		this.breakpoint = "desktop"

		if (data.expeditions.length < 4) {
			numberOfSlides = data.expeditions.length
		}

		if ($(window).width() < 1024) {
			numberOfSlides = 2
			this.breakpoint = "tablet"

			if (data.expeditions.length < 2) {
				numberOfSlides = 1
			}
		}

		this.slider = new Swiper(this.refs.slider, {
			slidesPerView: numberOfSlides,
			preventLinks: true,
			onFirstInit: (swiper) => {
				this.managePagination(swiper, numberOfSlides)
			},
			onSlideReset: (swiper) => {
				this.managePagination(swiper, numberOfSlides)
			},
			onSlideChangeEnd: (swiper, direction) => {
				this.managePagination(swiper, numberOfSlides)
			},
			onSlideClick: (swiper) => {
				$(swiper.clickedSlide).addClass('active')

				var origin = 0
				if (swiper.clickedSlideIndex > 0) {
					var position = $(swiper.clickedSlide).offset()
					origin = position.left
				}

				this.expendSlide($(swiper.clickedSlide), $(swiper.clickedSlide).clone(), origin, swiper.clickedSlideIndex)
			}
		})
	}

	managePagination(swiper, numberOfSlides) {
		const activeIndex = swiper.activeIndex
		const slides = $(this.refs.slider).find('.swiper-slide').length

		var maxToShow = numberOfSlides

		if (activeIndex == 0 || slides < maxToShow) {
			$(this.refs.sliderPrev).hide()
		}
		else {
			$(this.refs.sliderPrev).show()
		}

		if (Math.ceil(slides / maxToShow) == 1 || (activeIndex + maxToShow) == slides) {
			$(this.refs.sliderNext).hide()
		}
		else {
			$(this.refs.sliderNext).show()	
		}
	}

	handleSliderPrev(e, slider) {
		if (slider) {
			slider.swipePrev(true)
		}

		e.preventDefault()
		return false
	}

	handleSliderNext(e, slider) {
		if (slider) {
			slider.swipeNext(true)
		}

		e.preventDefault()
		return false
	}

	componentWillUnmount() {
		if (this.slider) {
			this.slider.destroy(true)
			this.slider = null
		}

		if (this.detailsSlider) {
			this.detailsSlider.destroy(true)
			this.detailsSlider = null
		}

		$(window).off('resize', this.fixSliderHeight)
	}

	fixSliderHeight() {
		$(this.refs.slider).css('height', $(window).height())

		// Reinit slider
		var newBreakpoint
		if ($(window).width() < 1024) {
			newBreakpoint = "tablet"
		}
		else {
			newBreakpoint = "desktop"
		}

		// Reinit
		if (newBreakpoint != this.breakpoint && this.slider && !$(this.refs.slider).hasClass('expended')) {
			this.slider.destroy(true)
			this.slider = null

			this.initSlider()
		}
	}

	handleClick(e, index) {
		$(this.refs.details).show()
		TweenMax.to($(this.refs.details), 0.5, { y: '-100%', ease: Expo.easeInOut })

		// Init mobile details slider
		this.detailsSlider = new Swiper(this.refs.sliderDetails, {
			initialSlide: index,
			slidesPerView: 1,
			onFirstInit: (swiper) => {
				this.manageFullSliderPagination(swiper)
			},
			onSlideReset: (swiper) => {
				this.manageFullSliderPagination(swiper)
			},
			onSlideChangeEnd: (swiper, direction) => {
				this.manageFullSliderPagination(swiper)
			}
		})

		e.preventDefault()
		return false
	}

	// Expend slide to full view in desktop
	expendSlide(slide, clone, origin, initIndex) {
		$(this.refs.slider).append(clone);
		clone.css({
			'left': origin + 'px',
			'top': 0,
			'position': 'absolute'
		})

		TweenMax.to($('h2', clone), 0.3, { opacity: 0, ease: Expo.easeInOut })
		TweenMax.to($('.underline', clone), 0.3, { opacity: 0, ease: Expo.easeInOut })
		TweenMax.to($('.number', clone), 0.3, { opacity: 0, ease: Expo.easeInOut })

		TweenMax.to(clone, 0.5, { width: $(window).width(), x: -origin, ease: Expo.easeInOut, onComplete:() => {
			$(this.refs.slider).addClass('expended')

			// Remove cloned item
			clone.remove()

			// Reinit slider
			this.slider = new Swiper(this.refs.slider, {
				slidersPerView: 1,
				initialSlide: initIndex,
				onFirstInit: (swiper) => {
					this.manageFullSliderPagination(swiper)
				},
				onSlideReset: (swiper) => {
					this.manageFullSliderPagination(swiper)
				},
				onSlideChangeEnd: (swiper, direction) => {
					this.manageFullSliderPagination(swiper)
				}
			})

			// Show details
			$('.details', slide).show()
			TweenMax.to($('.details', slide), 0.3, { opacity: 1, ease: Expo.easeInOut, onComplete:() => {
				$(this.refs.slider).addClass('show-details')
			} })
		} })

		// Remove slider
		setTimeout(() => {
			this.slider.destroy(false)
		}, 0)
	}

	manageFullSliderPagination(swiper) {
		const activeIndex = swiper.activeIndex
		const slides = $(this.refs.slider).find('.swiper-slide').length

		if (activeIndex == 0 || slides < 2) {
			$(this.refs.sliderPrev).hide()
			$(this.refs.detailsPrev).hide()
		}
		else {
			$(this.refs.sliderPrev).show()
			$(this.refs.detailsPrev).show()
		}

		if (activeIndex == (slides - 1) || slides < 2) {
			$(this.refs.sliderNext).hide()
			$(this.refs.detailsNext).hide()
		}
		else {
			$(this.refs.sliderNext).show()	
			$(this.refs.detailsNext).show()
		}
	}

	showIntro() {
		let intro = $(ReactDOM.findDOMNode(this)).find('#intro');
		let overlay = intro.find('.overlay');
		let popup = intro.find('.popup');

		intro.show();
		TweenMax.to(overlay, .8, { opacity: 0.72, ease: Expo.easeInOut });
		TweenMax.to(popup, .8, { top: 0, ease: Expo.easeInOut });
	}

	closeIntro(e) {
		let intro = $(e.currentTarget).parents('#intro');
		let overlay = intro.find('.overlay');
		let popup = intro.find('.popup');

		TweenMax.to(overlay, .8, { opacity: 0, ease: Expo.easeInOut });
		TweenMax.to(popup, .8, { top: '-100%', ease: Expo.easeInOut, onComplete: function() {
			intro.hide();
		} });

		e.preventDefault();
		return false;
	}

	render() {
		return <div id="home">
			<div id="intro">
				<div className="overlay"></div>
				<div className="popup">
					<a href="#" className="btn-close" onClick={this.closeIntro}>X</a>
					<img src="images/home/intro.png" alt="" />
					<p>{data.intro}</p>
					<a href="#" className="finish" onClick={this.closeIntro}>Fermer</a>
				</div>
			</div>
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
						<div className="clearfix"></div>
					</div>
					<a href="#" ref="sliderPrev" className="swiper-button-prev" onClick={(e) => this.handleSliderPrev(e, this.slider)}><i></i> Préc.</a>
					<a href="#" ref="sliderNext" className="swiper-button-next" onClick={(e) => this.handleSliderNext(e, this.slider)}><i></i> Suiv.</a>
				</div>
			</div>

			<div id="details" ref="details">
				<div className="swiper-container" ref="sliderDetails">
					<div className="swiper-wrapper">
						{data.expeditions.map((item, index) => {
							return <div className="swiper-slide"><Details {...item} key={index} /></div>
						})}
						<div className="clearfix"></div>
					</div>
					<a href="#" ref="detailsPrev" className="swiper-button-prev" onClick={(e) => this.handleSliderPrev(e, this.detailsSlider)}><i></i> Préc.</a>
					<a href="#" ref="detailsNext" className="swiper-button-next" onClick={(e) => this.handleSliderNext(e, this.detailsSlider)}><i></i> Suiv.</a>
				</div>
			</div>
		</div>
	}
}