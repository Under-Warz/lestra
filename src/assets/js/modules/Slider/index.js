import _ from 'underscore'
import page from 'page'
import React from 'react'
import Page from '../page'
import data from 'data'
import Swiper from 'swiper'

export default class Slider extends Page {

	componentDidMount() {
		// Init desktop slider
		setTimeout(() => {
			this.slider = new Swiper(this.refs.slider, {
				slidesPerView: 4,
				spaceBetween: 40,
				breakpoints: {
					767: {
						slidesPerView: 1
					},
					1280: {
						slidesPerView: 2,
						spaceBetween: 20
					}
				},
				preventClicks: true,
				prevButton: this.refs.prev,
				nextButton: this.refs.next
			})
		})
	}

	componentDidUnmount() {
		if (this.slider) {
			this.slider.destroy(true, true)
			this.slider = null
		}
	}

	render() {
		console.log(this.props)
		return (
			<div className="page slider">
				<header>
					<div className="bg" style={{backgroundImage: 'url(images/' + this.props.header.background_mobile + ')'}}></div>
					<div className="bg bg-desktop" style={{backgroundImage: 'url(images/' + this.props.header.background + ')'}}></div>

					<h2>{this.props.expeditionTitle}<span>{this.props.header.title}</span></h2>

					<div className="separator"></div>
				</header>

				<div className="content">
					<h2>{this.props.pageTitle}</h2>

					{this.props.items &&
						<div className="swiper-container" ref="slider">
							<div className="swiper-wrapper">
								{this.props.items.map((item) => {
									return <div className="swiper-slide">
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
								})}
							</div>
							<a href="#" ref="prev" className="swiper-button-prev"><i className="icon icon-slider-prev"></i></a>
							<a href="#" ref="next" className="swiper-button-next"><i className="icon icon-slider-next"></i></a>
						</div>
					}

					{this.getNextPageLink() != null && <p className="center"><a href={this.getNextPageLink()} onClick={this.handleNextPageClick} className="btn">Suivant</a></p>}
				</div>

				<div className="clearfix"></div>
			</div>
		)
	}
}