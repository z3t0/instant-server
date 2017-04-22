// Game
// Copyright Rafi Khan

const gameloop = require('node-gameloop')

const FRAMES_PER_SECOND = 10

var Player = require('./player.js')

class Game {
  constructor (opts) {
    console.log('Game started')

    // TODO bind server to some useful variable
    this.server = opts.server.emitter
    this.players = {}
  }

  init () {
    this.server.on('connect', (data) => {
      this.newPlayer(data)
    })

    this.server.on('disconnect', (data) => {
      this.disconnectPlayer(data)
    })

    this.server.on('left', (id) => {
      this.players[id].setVelocityX(-1)
    })

    this.server.on('right', (id) => {
      this.players[id].setVelocityX(1)
    })

    this.server.on('up', (id) => {
      this.players[id].setVelocityY(1)
    })

    this.server.on('down', (id) => {
      this.players[id].setVelocityY(-1)
    })
    this.id = gameloop.setGameLoop((delta) => {
      this.loop(delta)
    }, 1000 / FRAMES_PER_SECOND)
  }

  log (msg) {
    console.log('Game > ' + msg)
  }

  disconnectPlayer (data) {
    delete this.players[data.client.id]

    this.log('Player disconnected : ' + data.client.id)
  }

  newPlayer (client) {
    var newPlayer = new Player({client: client})
    this.players[newPlayer.id] = newPlayer

    client.emit('registered', newPlayer.getPlayerInfo())
    this.log('Player connected: ' + newPlayer.id)

    this.sendToAll('newPlayer', newPlayer.getPlayerInfo(), client)
  }

  sendToAll (msg, data, except) {
    // debugger;
    for (var id in this.players) {
      if (this.players[id].client !== except) {
        console.log('sending: ' + msg)
        this.players[id].client.emit(msg, data)
      }
    }
  }
  updateAllClients () {
    var send = []

    for (var id in this.players) {
      send.push(this.players[id].getPlayerInfo())
    }
    this.sendToAll('update', send)
  }

  loop (delta) {
    for (var id in this.players) {
      this.players[id].update(delta)
      console.log(this.players[id].y)
    }

    this.updateAllClients()
  }
}

module.exports = Game
