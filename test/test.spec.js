import Square from '../src/components/square'
import Game from '../src/components/game'
import store from '../src/store'

import React from 'react'
import TestUtils from 'react-addons-test-utils'

import { forEach } from 'ramda'

const spy = sinon.spy()

const {
    renderIntoDocument,
    isCompositeComponent,
    scryRenderedDOMComponentsWithClass,
    scryRenderedDOMComponentsWithTag,
    Simulate,
  } = TestUtils

describe('Game', () => {
  let game
  let render

  before(() => {
    store.dispatch({ type: 'NEW_GAME' })

    render = () => {
      game =
        renderIntoDocument(<Game history={store.getState()[0]} store={store} onRender={ spy }/>)
    }

    store.subscribe(render)
    render()
  })

  describe('initial', () => {

    it('is a composite component', () => {
      expect(isCompositeComponent(game)).to.equal(true)
    })

    it('has one board', () => {
      expect(scryRenderedDOMComponentsWithClass(game, 'board').length).to.equal(1)
    })

    it('begins with an empty history', () => {
      expect(game.props.history).to.eql([])
    })
  })

  describe('board', () => {
    let board

    before(() => {
      board = scryRenderedDOMComponentsWithClass(game, 'board')[0]
    })

    it('has nine squares', () => {
      expect(board.childNodes.length).to.equal(9)
    })

    it('tracks moves in game history', () => {
      const center = board.childNodes[4]
      const midLeft = board.childNodes[3]
      const topLeft = board.childNodes[0]

      Simulate.click(center)
      Simulate.click(midLeft)
      Simulate.click(topLeft)

      expect(game.props.history).to.eql([ 4, 3, 0 ])
    })

    it('prevents rewriting squares', () => {
      let center = board.childNodes[4]

      Simulate.click(center)
      Simulate.click(center)

      // Board was rerendered
      board = scryRenderedDOMComponentsWithClass(game, 'board')[0]

      expect(board.childNodes[4].innerHTML).to.equal('x')
    })

    it('can alternate moves, X first', () => {
      let center = board.childNodes[4]
      let midLeft = board.childNodes[3]
      let topLeft = board.childNodes[0]

      Simulate.click(center)
      Simulate.click(midLeft)
      Simulate.click(topLeft)

      // Board was rerendered
      board = scryRenderedDOMComponentsWithClass(game, 'board')[0]

      center = board.childNodes[4]
      midLeft = board.childNodes[3]
      topLeft = board.childNodes[0]

      expect(center.innerHTML).to.equal('x')
      expect(midLeft.innerHTML).to.equal('o')
      expect(topLeft.innerHTML).to.equal('x')
    })

    it('recognizes a win', () => {
      const moves = [ 4, 3, 0, 8, 2, 1, 6 ] // win

      forEach((idx) => Simulate.click(board.childNodes[idx]), moves)

      expect(scryRenderedDOMComponentsWithClass(game, 'board won').length).to.equal(1)
    })

    it('prevents further play after a win', () => {
      const lastSquare = board.childNodes[7]
      const moves = [ 4, 3, 0, 8, 2, 1, 6 ] // win

      forEach((idx) => Simulate.click(board.childNodes[idx]), moves)

      Simulate.click(lastSquare)

      expect(lastSquare.innerHTML).to.be.empty
    })
  })
})

describe('Square', () => {
  let square
  const mark = 'x'

  describe('when empty', () => {
    before(() => {
      square = renderIntoDocument(<Square store={store} square={1} />)
    })

    it('is a composite component', () => {
      expect(isCompositeComponent(square)).to.equal(true)
    })
  })

  describe('after play', () => {
    before(() => {
      square = renderIntoDocument(<Square store={store} square={1} mark={mark}/>)
    })

    it('has the correct content', () => {
      const div = scryRenderedDOMComponentsWithTag(square, 'div')[0]

      expect(div && div.innerHTML).to.equal(mark)
    })

    it('applies the players style', () => {
      expect(scryRenderedDOMComponentsWithClass(square, 'x')).not.to.be.empty
    })
  })
})
