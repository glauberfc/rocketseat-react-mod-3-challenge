import { createStore, compose, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'

import reducers from './ducks'
import sagas from './sagas'

const sagaMonitor = process.env.NODE_ENV === 'development' ? console.tron.createSagaMonitor : null

const sagaMiddleware = createSagaMiddleware({ sagaMonitor })

const middlewares = process.env.NODE_ENV === 'development'
  ? compose(
    applyMiddleware(sagaMiddleware),
    console.tron.createEnhancer(),
  )
  : applyMiddleware(sagaMiddleware)

const store = createStore(reducers, middlewares)

sagaMiddleware.run(sagas)

export default store
