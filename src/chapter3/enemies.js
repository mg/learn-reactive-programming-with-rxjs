import Rx from 'rx'

const ENEMY_FREQ= 1500
const ENEMY_SHOOTING_FREQ = 750

export default function Enemies(canvas) {
  const isVisible= (obj) => {
    return obj.x > -40 && obj.x < canvas.width + 40 && obj.y > -40 && obj.y < canvas.height + 40
  }

  return Rx.Observable
    .interval(ENEMY_FREQ)
    .scan(enemies => {
      let enemy= {
        x: parseInt(Math.random() * canvas.width),
        y: -30,
        shots: [],
      }

      Rx.Observable.interval(ENEMY_SHOOTING_FREQ).subscribe(
        () => {
          enemy.shots.push({x: enemy.x, y: enemy.y})
          enemy.shots= enemy.shots.filter(isVisible)
        }
      )
      enemies.push(enemy)
      return enemies.filter(isVisible)
    }, [])
}
