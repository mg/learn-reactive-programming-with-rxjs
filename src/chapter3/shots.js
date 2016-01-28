import Rx from 'rx'

export default function Shots(canvas) {
  return Rx.Observable
    .merge(
      Rx.Observable.fromEvent(canvas, 'click'),
      Rx.Observable.fromEvent(canvas, 'keydown').filter(e => e.keyCode === 32),
    )
    .sample(200)
    .timestamp()
}
