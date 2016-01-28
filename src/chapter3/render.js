import { ScoreSubject } from './score.js'
import { collision, getRandomInt } from './util.js'

const paintStars= (ctx, stars, width, height) => {
  ctx.fillStyle= '#000000'
  ctx.fillRect(0, 0, width, height)
  ctx.fillStyle= '#ffffff'
  stars.forEach(star => ctx.fillRect(star.x, star.y, star.size, star.size))
}

const drawTriangle= (ctx, x, y, width, color, direction) => {
  ctx.fillStyle= color
  ctx.beginPath()
  ctx.moveTo(x - width, y)
  ctx.lineTo(x, direction === 'up' ? y - width : y + width)
  ctx.lineTo(x + width, y)
  ctx.lineTo(x - width, y)
  ctx.fill()
}

const paintSpaceship= (ctx, spaceship) => {
  drawTriangle(ctx, spaceship.x - 10, spaceship.y, 20, '#ff0000', 'up')
}

const SHOOTING_SPEED= 15

const paintEnemies= (ctx, enemies) => {
  enemies.forEach(enemy => {
    enemy.y += 5
    enemy.x += getRandomInt(-15, 15)

    if(!enemy.isDead)
      drawTriangle(ctx, enemy.x, enemy.y, 20, '#00ff00', 'down')

    enemy.shots.forEach(shot => {
      shot.y += SHOOTING_SPEED
      drawTriangle(ctx, shot.x, shot.y, 5, '#00ffff', 'down')
    })
  })
}

const SCORE_INCREASE= 10

const paintShots= (ctx, shots, enemies) => {
  shots.forEach(shot => {
    for(let i= 0; i < enemies.length; i++) {
      let enemy= enemies[i]
      if(!enemy.isDead && collision(shot, enemy)) {
        ScoreSubject.onNext(SCORE_INCREASE)
        enemy.isDead= true
        shot.x= shot.y= -100
        break
      }
    }
    shot.y -= SHOOTING_SPEED
    drawTriangle(ctx, shot.x, shot.y, 5, '#ffff00', 'up')
  })
}

const paintScore= (ctx, score) => {
  ctx.fillStyle= '#ffffff'
  ctx.font= 'bold 26px sans-serif'
  ctx.fillText(`Score: ${score}`, 40, 43)
}

export default function Render(canvas) {
  let ctx= canvas.getContext('2d')

  return function(actors) {
    paintStars(ctx, actors.stars, canvas.width, canvas.height)
    paintEnemies(ctx, actors.enemies)
    paintSpaceship(ctx, actors.spaceship)
    paintShots(ctx, actors.shots, actors.enemies)
    paintScore(ctx, actors.score)
  }
}
