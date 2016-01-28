export function collision(t1, t2) {
  return (t1.x > t2.x - 20 && t1.x < t2.x + 20) && (t1.y > t2.y - 20 && t1.y < t2.y + 20)
}

export function gameOver(ship, enemies) {
  return enemies.some(enemy => {
    if(collision(ship, enemy)) return true
    return enemy.shots.some(shot => collision(ship, shot))
  })
}

export function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}
