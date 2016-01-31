import Rx from 'rx'
import { API_URL } from './constants.js'

const SearchQuery= DOM =>
  DOM
    .select('.search-field')
    .events('input')
    .debounce(300)
    .map(e => e.target.value)
    .filter(e => e.length > 2)
    .map(search => `${API_URL}${search}`)

export default SearchQuery
