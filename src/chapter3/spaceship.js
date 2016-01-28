import Rx from 'rx'

// Spaceship stream factory
export default function(canvas) {
  const HERO_Y= canvas.height - 30
  const position= x => {
    return {x, y: HERO_Y}
  }
  const mouseMove= Rx.Observable.fromEvent(canvas, 'mousemove')
  return mouseMove
    .map(e => position(e.clientX - 100))
    .startWith(position(canvas.width/2))
}
