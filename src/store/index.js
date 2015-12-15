import { createStore } from 'redux'

import game from '../reducers/game.js'

const store = createStore(game)

export default store
