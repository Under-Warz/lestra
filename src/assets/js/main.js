import React from 'react'
import ReactDOM from 'react-dom'
import page from 'page'
import data from 'data'
import App from './modules/app'
import router from './routes'

var app = ReactDOM.render(<App></App>, document.getElementById('root'))

// Start router
router(app)