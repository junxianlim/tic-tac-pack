import React, { Component, PropTypes } from 'react'

import { getBoard, checkForWin } from '../utils/board.js'

import { addIndex, contains, flatten, isEmpty, map } from 'ramda'

import Square from './square'

import './game.css'

const mapIndexed = addIndex(map)

class Game extends Component {

  static propTypes: {
    history: PropTypes.array.isRequired,
  }

  render () {
    const { store } = this.context
    const board = getBoard(this.props.history)
    const wins = flatten(checkForWin(board))
    const status = isEmpty(wins) ? 'board' : 'board won'

    return (<div style={{ textAlign: 'center' }}>
      <div className={status}>
        {this.renderBoard(board, wins)}
      </div>
      <button
        className="button"
        onClick={() => store.dispatch({ type: 'NEW_GAME' })}>
        New Game
      </button>
      <button
        className="button"
        onClick={() => store.dispatch({ type: 'UNDO_MOVE' })}>
        Undo Move
      </button>
    </div>)
  }

  renderBoard (board, wins) {
    return mapIndexed((player, idx) => {
      const props = { key: idx, square: idx }

      if (contains(idx, wins)) {
        props.win = true
      }
      if (player) {
        props.mark = player
      }

      return <Square {...props} />
    }, board)
  }
}

Game.contextTypes = {
  store: PropTypes.object,
}

export default Game
