import { API_URL } from './constants.js'

const SearchResult= JSONP =>
  JSONP
    .filter(res$ => res$.request.indexOf(API_URL) === 0)
    .concatAll() // or mergeAll()
    .pluck('query', 'search')

export default SearchResult
