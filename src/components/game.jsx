import React, { PropTypes } from 'react'

import { getBoard, checkForWin } from '../utils/board.js'

import { addIndex, contains, flatten, isEmpty, map } from 'ramda'

import Square from './square'

import './game.css'

const mapIndexed = addIndex(map)

const Game = ({}, { store }) => {
  const game = store.getState()[0]
  const board = getBoard(game)
  const wins = flatten(checkForWin(board))

  const renderBoard = (board, wins) => {
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

  return <div style={{ textAlign: 'center' }}>
    <div className={isEmpty(wins) ? 'board' : 'board won'}>
      {renderBoard(board, wins)}
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
  </div>
}

Game.contextTypes = {
  store: PropTypes.object,
}

export default Game
