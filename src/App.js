import React from 'react'
import { Provider } from 'react-redux'

import './config/reactotron'
import GlobalStyles from './styles/global'
import store from './store'
import Router from './Router'

const App = () => (
  <Provider store={store}>
    <GlobalStyles />
    <Router />
  </Provider>
)

export default App
