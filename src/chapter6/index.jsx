import Rx from 'rx'
import Cycle from '@cycle/core'
import CycleDOM from '@cycle/dom'
import CycleJSONP from '@cycle/jsonp'

import { API_URL } from './constants.js'

import SearchResult from './searchresult.js'
import SearchBox from './searchbox.jsx'
import Form from './form.jsx'

const intent= JSONP => SearchResult(JSONP)

const model= actions => actions.startWith([])

const main= responses => {
  const searchBox= SearchBox(responses.DOM)

  const view= searchResult =>
    Rx.Observable.combineLatest(
      searchBox.DOM, searchResult,
      Form
    )

  return {
    DOM: view(model(intent(responses.JSONP))),
    JSONP: searchBox.query,
  }
}

const drivers= {
  DOM: CycleDOM.makeDOMDriver('#app'),
  JSONP: CycleJSONP.makeJSONPDriver(),
}

Cycle.run(main, drivers)
