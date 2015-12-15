import React from 'react' //, { Component, PropTypes }
import ReactDOM from 'react-dom'

import store from './store/index.js'
import Game from './components/game'

import { Provider } from 'react-redux'

window.onload = () => {
  const render = () => {
    const state = store.getState()
    const currentGame = state[0]

    // class Provider extends Component {

    //   getChildContext () {
    //     return {
    //       store: this.props.store,
    //     }
    //   }

    //   render () {
    //     return this.props.children
    //   }
    // }

    // Provider.childContextTypes = {
    //   store: PropTypes.object,
    // }

    ReactDOM.render(
      <Provider store={store}>
        <Game history={currentGame}/>
      </Provider>,
      document.getElementById('tic-tac-react')
    )
  }

  store.subscribe(render)
  render()
}

