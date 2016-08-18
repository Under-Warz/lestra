import _ from 'underscore'
import React from 'react'
import { Link } from 'react-router'
import data from 'data'

export default class Timeline extends React.Component {
	render() {
		return <div id="timeline">
			<div className="mobile">
				{Object.keys(this.props.views).map((step, index) => {
					var title, current = false

					switch(step) {
						case 'preparation': 
							title = 'Préparation'
							break
						case 'exploration':
							title = 'Exploration'
							break
						case 'retour':
							title = 'Retour'
							break
					}

					if (step == this.props.currentStep) current = true

					return (
						<a href="#" onClick={(e) => { e.preventDefault(); return false }} className={current ? "current" : ""} style={{width: 100 / Object.keys(this.props.views).length + "%"}}>
							{title}

							<ul>
								{this.props.views[step].map((view) => {
									var current = false

									if (view.slug == this.props.currentPage) current = true

									return <li><Link to={"/expedition/" + this.props.slug + "/" + view.slug} className={current ? "current" : ""}>{view.title}</Link></li>
								})}
							</ul>
						</a>
					)
				})}
				<div className="clearfix"></div>
			</div>

			<div className="desktop">
				{Object.keys(this.props.views).map((step, index) => {
					var title, current = false

					switch(step) {
						case 'preparation': 
							title = 'Préparation'
							break
						case 'exploration':
							title = 'Exploration'
							break
						case 'retour':
							title = 'Retour'
							break
					}

					if (step == this.props.currentStep) current = true

					return (
						<div className={"step " + (current ? "current" : "")} style={{width: 100 / Object.keys(this.props.views).length + "%"}}>
							<h4>{title}</h4>
							<h3>{title}</h3>

							<div className="line">
								{this.props.views[step].map((view, index) => {
									var current = false

									if (view.slug == this.props.currentPage) current = true
									
									return (
										<div className={current ? "current" : ""} style={{left: ((100 / (this.props.views[step].length - 1)) * index) + "%"}}>
											<Link to={"/expedition/" + this.props.slug + "/" + view.slug}>
												<i></i>
												<span>{view.title}</span>
											</Link>
										</div>
									)
								})}
							</div>
						</div>
					)
				})}
				<div className="clearfix"></div>
			</div>
		</div>
	}
}