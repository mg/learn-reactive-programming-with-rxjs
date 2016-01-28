const getRandomInt= (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

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

const collision= (t1, t2) => {
  return (t1.x > t2.x - 20 && t1.x < t2.x + 20) && (t1.y > t2.y - 20 && t1.y < t2.y + 20)
}

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

function paintShots(ctx, shots, enemies) {
  shots.forEach(shot => {
    for(let i= 0; i < enemies.length; i++) {
      let enemy= enemies[i]
      if(!enemy.isDead && collision(shot, enemy)) {
        enemy.isDead= true
        shot.x= shot.y= -100
        break
      }
    }
    shot.y -= SHOOTING_SPEED
    drawTriangle(ctx, shot.x, shot.y, 5, '#ffff00', 'up')
  })
}

export default function Render(canvas) {
  let ctx= canvas.getContext('2d')

  return function(actors) {
    paintStars(ctx, actors.stars, canvas.width, canvas.height)
    paintEnemies(ctx, actors.enemies)
    paintSpaceship(ctx, actors.spaceship)
    paintShots(ctx, actors.shots, actors.enemies)
  }
}
