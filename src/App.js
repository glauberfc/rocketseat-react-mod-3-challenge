import React from 'react'
import { Provider } from 'react-redux'
import ReactModal from 'react-modal'
import { library } from '@fortawesome/fontawesome-svg-core'
import {
  faTimesCircle,
  faChevronRight,
  faExclamationCircle,
} from '@fortawesome/free-solid-svg-icons'

import './config/reactotron'
import GlobalStyles from './styles/global'
import store from './store'
import Router from './Router'

ReactModal.setAppElement('#root')
library.add(faTimesCircle, faChevronRight, faExclamationCircle)

const App = () => (
  <Provider store={store}>
    <GlobalStyles />
    <Router />
  </Provider>
)

export default App
