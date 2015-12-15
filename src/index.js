import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'

import store from './store/index.js'
import Game from './components/game'

const render = () => {
  ReactDOM.render(
    <Provider store={store}>
      <Game/>
    </Provider>,
    document.getElementById('app')
  )
}

store.subscribe(render)
render()
