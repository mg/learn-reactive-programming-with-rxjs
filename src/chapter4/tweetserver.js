var ws= require('ws')
var Twit= require('twit')
var Rx= require('rx')

var secret= require('./secret.js')

var T= new Twit(secret)

var stream= T.stream('statuses/filter', {
  track: 'earthquake',
  locations: []
})

var port= 8081
function onConnect(ws) {
  console.log('Client connected on localhost:' + port)

  var onMessage= Rx.Observable
    .fromEvent(ws, 'message')
    .flatMap(function(quakes) {
      quakes= JSON.parse(quakes)
      return Rx.Observable.from(quakes.quakes)
    })
    .scan(function(boundsArray, quake) {
      var bounds= [
        quake.lng - 0.3, quake.lat - 0.15,
        quake.lng + 0.3, quake.lat + 0.15,
      ].map(function(coordinate) {
        coordinate= coordinate.toString()
        return coordinate.match(/\-?\d+(\.\-?\d{2})?/)[0]
      })

      boundsArray= boundsArray.concat(bounds)
      return boundsArray.slice(Math.max(boundsArray.length - 50, 0))
    }, [])
    .bufferWithTime(500)
    .filter(boundsArray => boundsArray.length > 0)
    .subscribe(function(boundsArray) {
      stream.stop()
      stream.locations= boundsArray.toString()
      stream.start()
    })

  var onTweet= Rx.Observable
    .fromEvent(stream, 'tweet')
    .subscribe(function(tweet) {
      ws.send(
        JSON.stringify(tweet),
        function(err) {
        }
      )
    })

  var onClose= Rx.Observable.fromEvent(server, 'close').subscribe(function() {
    console.log('closing')
    onMessage.dispose()
    onTweet.dispose()
    onClose.dispose()
  })
}

var server= new ws.Server({port})

Rx.Observable.fromEvent(server, 'connection').subscribe(onConnect)
