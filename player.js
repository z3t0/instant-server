const color = require('random-hex')

class Player {

  constructor(opts) {

	this.client = opts.client

	this.id = this.client.id
	this.x = 0
	this.y = 0

	this.sizeX = 0.05
	this.sizeY = 0.05

	this.vx = 0
	this.vy = 1

	this.speed = 50
	var c = color.generate()
	c = c.substring(1, c.length)
	this.color = parseInt(c, 16)


  }
  
  getPlayerInfo () {
		var info = {}

		info.id = this.id

		info.x = this.x
		info.y = this.y

		info.sizeX = this.sizeX
		info.sizeY = this.sizeY

		info.vx = this.vx
		info.vy = this.vy

		info.speed = this.speed
		info.color = this.color

		return info
	}

  update (deltaTime) {
      this.x += this.vx * this.speed * deltaTime
      this.y += this.vy * this.speed * deltaTime
  }
}


module.exports = Player
