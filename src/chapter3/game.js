import Rx from 'rx'

const GAME_SPEED= 20

import StarField from './starfield.js'
import Spaceship from './spaceship.js'
import Shots from './shots.js'
import Enemies from './enemies.js'


export default function Game(canvas) {
  let ctx= canvas.getContext('2d')

  let spaceShip= Spaceship(canvas)
  let heroShots= Rx.Observable
    .combineLatest(
      Shots(canvas),
      spaceShip,
      (shotEvents, ship) => {
        return {x: ship.x, y: ship.y, timestamp: shotEvents.timestamp}
      }
    )
    .distinctUntilChanged(shot => shot.timestamp)
    .scan((shotArray, shot) => {
      shotArray.push(shot)
      return shotArray
    }, [])

  return Rx.Observable
    .combineLatest(
      StarField(canvas),
      spaceShip,
      Enemies(canvas),
      heroShots,
      (stars, spaceship, enemies, shots) => {
        return { stars, spaceship, enemies, shots}
      }
    )
    .sample(GAME_SPEED)
}
