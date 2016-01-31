import Rx from 'rx'
import CycleDOM from '@cycle/dom'

import SearchQuery from './searchquery.js'

/** @jsx hJSX*/
const hJSX= CycleDOM.hJSX

const SearchBox= DOM => {
  const dom$= Rx.Observable.just(
    <div className='search-field'>
      <input type='text'/>
    </div>
  )

  const searchQuery$= SearchQuery(DOM)

  return {
    DOM: dom$,
    query: searchQuery$,
  }
}

export default SearchBox
