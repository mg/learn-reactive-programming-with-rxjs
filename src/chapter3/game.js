import Rx from 'rx'

const GAME_SPEED= 20

import StarField from './starfield.js'
import Spaceship from './spaceship.js'
import Shots from './shots.js'
import Enemies from './enemies.js'
import { Score } from './score.js'

import { gameOver } from './util.js'

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
    .startWith([])

  return Rx.Observable
    .combineLatest(
      StarField(canvas),
      spaceShip,
      Enemies(canvas),
      heroShots,
      Score,
      (stars, spaceship, enemies, shots, score) => {
        return { stars, spaceship, enemies, shots, score}
      }
    )
    .sample(GAME_SPEED)
    .takeWhile(actors => gameOver(actors.spaceship, actors.enemies) === false)
}
