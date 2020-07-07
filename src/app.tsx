import React from 'react'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import reducer from './store/reducers'
import thunk from 'redux-thunk'
import { Bod } from './components'
import { actionMiddleWare } from './store/actions/action'

export const store = createStore(reducer, applyMiddleware(thunk, actionMiddleWare))

export default class App extends React.Component {
  public render() {
    return (
      <Provider store={store}>
        <Bod />
      </Provider>
    )
  }
}
