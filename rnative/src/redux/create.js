import { createStore, applyMiddleware, compose, combineReducers } from 'redux'
import reduxThunkMiddleware from 'redux-thunk'
import Reactotron from 'reactotron'
import * as reducers from './reducers'

Reactotron.connect({
  enabled: __DEV__,
  name: 'React Web', // Display name of the client
  server: 'i.mgbeta.ru', // IP of the server to connect to
  port: 3334, // Port of the server to connect to (default: 3334)
  enabled: true // Whether or not Reactotron should be enabled.
})

const enhancer = compose(
  applyMiddleware(
    reduxThunkMiddleware,
    Reactotron.reduxMiddleware
  )
)

export default function configureStore(initialState) {
  const store = createStore(
    combineReducers({ ...reducers }),
    initialState,
    enhancer
  )
  Reactotron.addReduxStore(store)
  return store
}
