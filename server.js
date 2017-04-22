var http = require('http')
var socket = require('socket.io')
var EventEmitter = require('eventemitter3')

function Server (opts, game) {
  this.http = http.createServer()
  this.io = socket(this.http)

  this.emitter = new EventEmitter()
  this.game = game

  this.port = opts.port || 3000

  this.io.on('connection', (client) => {
    this.emitter.emit('connect', client)

    client.on('event', (data) => {
      this.emitter.emit('event', data)
    })

    client.on('left', (data) => {
      this.emitter.emit('left', client.id)
    })

    client.on('right', (data) => {
      this.emitter.emit('right', client.id)
    })

    client.on('up', (data) => {
      this.emitter.emit('up', client.id)
    })

    client.on('down', (data) => {
      this.emitter.emit('down', client.id)
    })

    client.on('disconnect', () => {
      this.emitter.emit('disconnect', client)
    })
  })

  this.http.listen(this.port)
}

module.exports = Server
