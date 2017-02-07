const color = require('random-hex')

function Player(opts) {

	var player = []
	player.client = opts.client

	player.id = player.client.id
	player.x = 0
	player.y = 0

	player.sizeX = 0.05
	player.sizeY = 0.05

	player.vx = 0
	player.vy = 1

	player.speed = 0.05
	var c = color.generate()
	c = c.substring(1, c.length)
	player.color = parseInt(c, 16)

	player.getPlayerInfo = function () {
		var info = {}

		info.id = player.id

		info.x = player.x
		info.y = player.y

		info.sizeX = player.sizeX
		info.sizeY = player.sizeY

		info.vx = player.vx
		info.vy = player.vy

		info.speed = player.speed
		info.color = player.color

		return info
	}

	return player
}


module.exports = Player
