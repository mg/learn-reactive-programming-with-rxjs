import React from 'react'
import Rx from 'rx'
import { DOM } from 'rx-dom'
import L from 'leaflet'

import Data from './data.jsx'
import Tweets from './tweets.jsx'
import Quakes from './quakes.js'

let Server

export default class Chapter4 extends React.Component {
  render() {
    return (
      <div style={{...styles.fill, ...styles.fillChild}}>
       <link rel='stylesheet' href='http://cdn.leafletjs.com/leaflet/v0.7.7/leaflet.css' />
       <div style={styles.row}>
        <div style={{flexGrow: 2, ...styles.fillVert, ...styles.fillChild}}>
          <div style={{...styles.col, ...styles.fillHorz}}>

            <div style={{flexGrow: 2, ...styles.fillHorz, ...styles.fillChild}}>
              <div style={styles.fill} ref={e => this.domMap= e}></div>
            </div>

            <div style={{height: 200, overflowY: 'scroll'}}>
              <Data quakes={this.state.quakes} circles={this.codeLayers} quakeLayer={this.quakeLayer} map={this.map}/>
            </div>
          </div>
        </div>

        <div style={{width: 400, ...styles.fillVert, overflowY: 'scroll'}}>
          <Tweets tweets={this.state.tweets}/>
        </div>

       </div>
      </div>
    )
  }

  componentDidMount() {
    const position= [33.858631, -118.279602]
    const zoom= 7
    this.map= L.map(this.domMap).setView(position, zoom)

    L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png').addTo(this.map)
    this.codeLayers= {}
    this.quakeLayer= L.layerGroup([]).addTo(this.map)

    this.subCircles= Quakes.subscribe(quake => {
      let circle= L.circle([quake.lat, quake.lng], quake.size).addTo(this.map)
      this.quakeLayer.addLayer(circle)
      this.codeLayers[quake.id]= this.quakeLayer.getLayerId(circle)
    })

    this.subData= Quakes
      .bufferWithTime(500)
      .filter(quakes => quakes.length > 0)
      .subscribe(incoming => {
        let quakes= this.state.quakes
        quakes= quakes.concat(incoming)
        quakes.sort((a,b) => b.time - a.time)
        this.setState({quakes})
      })

    Server= DOM.fromWebSocket('ws://127.0.0.1:8081')
    this.subQuakesToServer= Quakes
      .bufferWithCount(100)
      .subscribe(quakes => {
        let data= quakes.map(quake => {
          return {
            id: quake.id,
            lat: quake.lat,
            lng: quake.lng,
            mag: quake.magnitude,
          }
        })
        Server.onNext(JSON.stringify({quakes: data}))
      })

    this.subServer= Server
      .map(msg => JSON.parse(msg.data))
      .subscribe(tweet => {
        let tweets= this.state.tweets
        tweets.unshift(tweet)
        this.setState({tweets})
      })
  }

  componentWillUnmount() {
    this.subCircles.dispose()
    this.subData.dispose()
    this.subQuakesToServer.dispose()
    this.subServer.dispose()
  }

  state= {
    quakes: [],
    tweets: []
  }
}

const styles= {
  row: {
    display: 'flex',
    width: '100%',
  },

  col: {
    display: 'flex',
    flexDirection: 'column',
  },

  fill: {
    width: '100%',
    alignSelf: 'stretch',
  },

  fillVert: {
    alignSelf: 'stretch',
  },

  fillHorz: {
    width: '100%',
  },

  fillChild: {
    display: 'flex',
    alignItems: 'stretch',
  },
}
