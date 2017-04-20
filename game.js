// Game
// Copyright Rafi Khan

const gameloop = require('node-gameloop')

var player = require('./player.js')

class Game {

  constructor(opts) {
  
    console.log("Game started")

    // TODO bind server to some useful variable
    var server = opts.server.emitter

    this.players = []

    server.on('connect', (data) => {
      this.newPlayer(data)
    })

    server.on('disconnect', (data) => {
      this.disconnectPlayer(data)
    })

    this.id = gameloop.setGameLoop((delta) => {
      this.loop(delta)
    }, 1000 / 1)
  }

  log(msg) {
    console.log("Game > " + msg)
  }

  disconnectPlayer(data) {
    var id = data.client.id
    var index = null

    for (var i = 0; i < this.players.length; i++) {
      var p = this.players[i].id
      if (id == p) {
        index = i
        break;
      }
    }

    if (index != null) {
      this.players.splice(index, 1)
    }

    this.log('Player disconnected : ' + id)
  }

  newPlayer(client) {
    var new_player = new player({client: client})
    this.players.push(new_player)

    client.emit('registered', new_player.getPlayerInfo())
    this.log("Player connected: " + new_player.id)

    this.sendToAll('new_player', new_player.getPlayerInfo(), client)
  }

  sendToAll(msg, data, except) {

    for (var i = 0; i < this.players.length; i++) {
      if (this.players[i].client == except)
        continue
      else
        this.players[i].client.emit(msg, data)
    }
  }

  updateAllClients() {

    var send = []	

    for (var i = 0; i < this.players.length; i++) {
      send.push(this.players[i].getPlayerInfo())
    }

    this.sendToAll('update', send)
  }

  loop(delta) {

    for (var i = 0; i < this.players.length; i++) {
      this.players[i].update(delta)
    }

    this.updateAllClients()

  }
}



module.exports = Game
