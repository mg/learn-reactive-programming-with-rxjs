import React from 'react'
import Rx from 'rx'

import Render from './render.js'
import Game from './game.js'

export default class Chapter3 extends React.Component {
  render() {
    return (
      <canvas style={{display: 'flex', width: '100%', alignItems: 'stretch', alignSelf: 'stretch'}} tabIndex={1} ref={e => this.canvas= e}></canvas>
    )
  }

  componentDidMount() {
    this.canvas.width= this.canvas.parentNode.clientWidth
    this.canvas.height= this.canvas.parentNode.clientHeight - 3
    this.sub= Game(this.canvas).subscribe(Render(this.canvas))
  }

  componentWillUnmount() {
    this.sub.dispose()
  }
}
