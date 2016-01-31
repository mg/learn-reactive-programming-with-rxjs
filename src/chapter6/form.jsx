import CycleDOM from '@cycle/dom'

import { WIKI_URL } from './constants.js'

/** @jsx hJSX*/
const hJSX= CycleDOM.hJSX
const Form= (searchBox, searchResults) => {
  searchResults= searchResults.map(result => <div><a href={`${WIKI_URL}${result.title}`}>{result.title}</a></div>)
  return(
    <div>
      <h1>Wikipedia Search</h1>
      {searchBox}
      <hr/>
      <div>{searchResults}</div>
    </div>
  )
}

export default Form

const h= CycleDOM.h
const vtree= searchResults =>
  h('div', [
    h('h1', 'Wikipedia Search '),
    h('input', {attributes: {type: 'text'}}),
    h('hr'),
    h('div', searchResults.map(result =>
      h('div', [
        h('a', {href: `${WIKI_URL}${result.title}`}, result.title)
      ])
    ))
  ])
