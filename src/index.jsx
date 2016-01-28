import React from 'react'
import { render } from 'react-dom'
import { Router, Route, IndexRedirect } from 'react-router'

import Main from './main.jsx'
import Chapter3 from './chapter3'

render((
  <Router>
    <Route path='/' component={Main}>
      <IndexRedirect to='c3'/>
      <Route path='c3' component={Chapter3} />
    </Route>
  </Router>
), document.getElementById('app'))
