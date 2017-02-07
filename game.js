// Game
// Copyright Rafi Khan

var player = require('./player.js')

function Game (opts) {
	console.log("Game started")

	var game = {}

	var server = opts.server.emitter

	game.players = []

	game.log = log
	game.newPlayer = newPlayer
	game.disconnectPlayer = disconnectPlayer
	game.updateAllClients = updateAllClients
	game.sendToAll = sendToAll

 	server.on('connect', function(data) {
		game.newPlayer(data)
	})

	server.on('disconnect', function(data) {
		game.disconnectPlayer(data)
	})

	return game
}

function log(msg) {
	console.log("Game > " + msg)
}

function disconnectPlayer(data) {
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

function newPlayer(client) {
		var new_player = player({client: client})
		this.players.push(new_player)

		client.emit('registered', new_player.getPlayerInfo())
		this.log("Player connected: " + new_player.id)

		this.sendToAll('new_player', new_player.getPlayerInfo(), client)
}

function sendToAll(msg, data, except) {

	for (var i = 0; i < this.players.length; i++) {
		if (this.players[i].client == except)
			continue
		else
			this.players[i].client.emit(msg, data)
	}
}

function updateAllClients() {

	var send = []	

	for (var i = 0; i < this.players.length; i++) {
		send.push(this.players[i].getPlayerInfo())
	}

	this.sendToAll('update', send)
}

module.exports = Game
