import Rx from 'rx'

export default function(quakes, scheduler) {
  return quakes
    .pluck('properties')
    .bufferWithTime(500, scheduler)
    .filter(quakes => quakes.length > 0)
}
