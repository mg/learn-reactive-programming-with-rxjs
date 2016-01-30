import Rx from 'rx'
import { DOM } from 'rx-dom'

const QUAKE_URL= 'http://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojsonp'

const request= {
  url: QUAKE_URL,
  jsonpCallback: 'eqfeed_callback'
}

const mapQuake= quake => {
  return {
    id: quake.id,
    lat: quake.geometry.coordinates[1],
    lng: quake.geometry.coordinates[0],
    size: quake.properties.mag * 10000,
    time: quake.properties.time,
    magnitude: quake.properties.mag,
    place: quake.properties.place,
  }
}

export default Rx.Observable
  .interval(5000)
  .flatMap(() => DOM.jsonpRequest(request).retry(3))
  .flatMap(result => Rx.Observable.from(result.response.features))
  .distinct(quake => quake.id)
  .share()
  .map(mapQuake)
