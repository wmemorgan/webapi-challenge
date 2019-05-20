//REDUX
import { applyMiddleware, createStore } from "redux"
//MIDDLEWARE
import thunk from 'redux-thunk'
// import logger from 'redux-logger'
// REDUCER
import reducer from '../reducers'

/**
 * This defines based configuration for setting up Redux with React
 */

 const store = createStore(reducer, applyMiddleware(thunk))

export { store }
