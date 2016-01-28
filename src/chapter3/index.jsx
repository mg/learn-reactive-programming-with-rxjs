import React from 'react'
import Rx from 'rx'

import Render from './render.js'
import Game from './game.js'

export default class Chapter3 extends React.Component {
  render() {
    return (
      <div>
        <h3>Chapter 3 - Spaceship</h3>
        <canvas width={500} height={500} ref={e => this.canvas= e}></canvas>
      </div>
    )
  }

  componentDidMount() {
    this.sub= Game(this.canvas).subscribe(Render(this.canvas))
  }

  componentWillUnmount() {
    this.sub.dispose()
  }
}
