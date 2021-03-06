import React from 'react'
import { render } from 'react-dom'
import { Router, Route, IndexRedirect } from 'react-router'

import Main from './main.jsx'
import Chapter2 from './chapter2'
import Chapter3 from './chapter3'
import Chapter4 from './chapter4'

render((
  <Router>
    <Route path='/' component={Main}>
      <IndexRedirect to='c2'/>
      <Route path='c2' component={Chapter2} />
      <Route path='c3' component={Chapter3} />
      <Route path='c4' component={Chapter4} />
    </Route>
  </Router>
), document.getElementById('app'))
