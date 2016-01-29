import React from 'react'
import Rx from 'rx'
import L from 'leaflet'

import Quakes from './quakes.js'

export default class Chapter2 extends React.Component {
  render() {
    return (
      <div style={{display: 'flex', width: '100%', alignItems: 'stretch', alignSelf: 'stretch'}}>
       <link rel='stylesheet' href='http://cdn.leafletjs.com/leaflet/v0.7.7/leaflet.css' />
       <div style={{display: 'flex', width: '100%', alignItems: 'stretch', alignSelf: 'stretch'}} ref={e => this.map= e}></div>
      </div>
    )
  }

  componentDidMount() {
    const position= [33.858631, -118.279602]
    const zoom= 7
    const map= L.map(this.map).setView(position, zoom)
    L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png').addTo(map)

    this.subQuakes= Quakes.subscribe(quake => L.circle([quake.lat, quake.lng], quake.size).addTo(map))
  }

  componentWillUnmount() {
    this.subQuakes.dispose()
  }
}
