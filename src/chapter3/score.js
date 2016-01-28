import Rx from 'rx'

let ScoreSubject= new Rx.Subject()
let Score= ScoreSubject
  .scan((prev, cur) => prev + cur, 0)
  .concat(Rx.Observable.return(0))
  .startWith(0)

export { Score, ScoreSubject }
