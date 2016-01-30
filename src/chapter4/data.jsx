import React from 'react'
import { DOM } from 'rx-dom'

class Data extends React.Component {
  render() {
    const { quakes }= this.props

    if(this.hoverSubscription) this.hoverSubscription.dispose()
    if(this.clickSubscription) this.clickSubscription.dispose()

    return (
      <table style={{width: '100%'}}>
        <thead>
          <tr>
            <th style={{textAlign: 'left'}}>Location</th>
            <th style={{textAlign: 'left'}}>Magnitude</th>
            <th style={{textAlign: 'left'}}>Time</th>
          </tr>
        </thead>
        <tbody ref={e => this.body= e}>
          {
            quakes.map(quake =>
              <Row
                key={quake.id}
                quake={quake}
              />
            )
          }
        </tbody>
      </table>
    )
  }

  componentDidUpdate() {
    const { circles, quakeLayer, map }= this.props

    const idFromEvent= event => {
      return Rx.Observable
        .fromEvent(this.body, event)
        .filter(event => event.target.tagName === 'TD')
        .pluck('target', 'parentNode')
        .map(e => e.getAttribute('data-id'))
        .distinctUntilChanged()
    }

    this.hoverSubscription= idFromEvent('mousemove')
      .pairwise()
      .subscribe(([prev, cur]) => {
        quakeLayer.getLayer(circles[prev]).setStyle({color: '#00f'})
        quakeLayer.getLayer(circles[cur]).setStyle({color: '#f00'})
      })

    this.clickSubscription= idFromEvent('click').subscribe(id => {
      map.panTo(quakeLayer.getLayer(circles[id]).getLatLng())
    })
  }

  componentWillUnmount() {
    this.hoverSubscription.dispose()
    this.clickSubscription.dispose()
  }
}

class Row extends React.Component {
  render() {
    const { id, place, magnitude, time }= this.props.quake
    return (
      <tr data-id={id}>
        <td>{place}</td>
        <td>{magnitude}</td>
        <td>{new Date(time).toString()}</td>
      </tr>
    )
  }
}

export default Data
