import { createStore, applyMiddleware, compose } from 'redux'
import { routerMiddleware } from 'connected-react-router'
import { createLogger } from 'redux-logger'
import createSagaMiddleware from 'redux-saga'
import { createBrowserHistory } from 'history'
import createGlobalReducer from './redux'
import globalSagas from './sagas'

/* eslint-disable no-underscore-dangle */

export const history = createBrowserHistory()

history.listen(location => {
    window.scrollTo(0, 0)
    console.log(location.pathname, 'location')
})

const sagaMiddleware = createSagaMiddleware()
const logger = createLogger({
    collapsed: true,
    duration: true,
    diff: true,
})
const composeEnhancers =
    process.env.NODE_ENV === 'development'
        ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
        : null || compose

const middlewares = [
    routerMiddleware(history),
    sagaMiddleware,
    process.env.NODE_ENV === 'development' && logger,
].filter(d => d)

const store = createStore(
    createGlobalReducer(),
    composeEnhancers(applyMiddleware(...middlewares))
)

sagaMiddleware.run(globalSagas)

export default store
