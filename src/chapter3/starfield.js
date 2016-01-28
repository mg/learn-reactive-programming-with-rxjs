import Rx from 'rx'

const SPEED= 40
const STAR_COUNT= 250

// Starfields stream factory
export default function(canvas) {
  const star= () => {
    return {
      x: parseInt(Math.random() * canvas.width),
      y: parseInt(Math.random() * canvas.height),
      size: Math.random() * 3 + 1,
    }
  }

  return Rx.Observable.range(1, STAR_COUNT)
    .map(star)
    .toArray()
    .flatMap(starsArray => Rx.Observable.interval(SPEED).map(() => {
      starsArray.forEach(star => {
        star.y= star.y > canvas.height ? 0 : star.y + 3
      })
      return starsArray
    }))
}
