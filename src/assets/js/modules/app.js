import React from 'react'
import ReactDOM from 'react-dom'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import { Link, RouteHandler } from 'react-router'
import 'gsap'

class View extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      content: 'div',
      params: {}
    }
  }

  componentDidMount() {
    this.el = ReactDOM.findDOMNode(this)
  }

  componentWillUnmout() {
    this.el = null
  }

  setContent(view, params) {
    params = params || {};
    this.setState({
      content: view,
      params: params
    })
  }

  render() {
    return <div className="view"><this.state.content {...this.state.params} /></div>
  }
}

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      content: 'div',
      firstLoad: true
    }
  }

  componentDidMount() {
    this.el = ReactDOM.findDOMNode(this)
    this.currentIndex = 0;
    this.pages = [
      this.refs.p0,
      this.refs.p1
    ]
  }

  componentWillUnmount() {
    this.el = null
    this.current = null
    this.next = null
  }

  get currentPage() {
    return this.pages[this.currentIndex]
  }

  get nextPage() {
    return this.pages[(this.currentIndex + 1) % this.pages.length]
  }

  setPage(view, params) {
    var current = this.currentPage,
        next = this.nextPage

    /*if (this.state.firstLoad) {
      current.setContent(view, params)

      this.setState({
        firstLoad: false
      })
    }
    else {*/
      if(current.content != view) {
        $(this.el).addClass('transition')
        
        next.setContent(view, params)

        // Animation
        next.el.style.opacity = 0
        TweenMax.killTweensOf([
            current.el,
            next.el
        ])

        const duration = 0.5

        next.el.style.display = ''
        current.el.style.display = ''

        // Fade in
        TweenMax.to(next.el, duration, {
          opacity: 1
        })

        // Fade out
        TweenMax.to(current.el, duration, {
          opacity: 0,
          onComplete: () => {
            current.setContent('div', params)
            current.el.style.display = 'none'
            next.el.style.display = ''

            $(this.el).removeClass('transition')
          }
        })

        this.currentIndex = (this.currentIndex + 1) % this.pages.length
      }
    //}
  }

  shouldComponentUpdate(props, state) {
    return false
  }

  render() {
    return <div>
      <View ref="p0" />
      <View ref="p1" />
    </div>
  }
}