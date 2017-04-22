var assert = require('chai').assert
var io = require('socket.io-client')

const Player = require('../player.js')
var client = {'id': 1}

describe('Player', function () {
  var player = new Player({client: client})

  describe('constructor', function () {
    it(`should have 'client' property`, function (done) {
      assert.property(player, 'client')
      done()
    })

    it(`should have 'id' property`, function (done) {
      assert.property(player, 'id')
      done()
    })

    it(`should have 'x' property`, function (done) {
      assert.property(player, 'x')
      done()
    })

    it(`should have 'y' property`, function (done) {
      assert.property(player, 'y')
      done()
    })

    it(`should have 'sizeX' property`, function (done) {
      assert.property(player, 'client')
      done()
    })

    it(`should have 'sizeY' property`, function (done) {
      assert.property(player, 'sizeY')
      done()
    })

    it(`should have 'vx' property`, function (done) {
      assert.property(player, 'vx')
      done()
    })

    it(`should have 'speed' property`, function (done) {
      assert.property(player, 'speed')
      done()
    })

    it(`should have 'color' property`, function (done) {
      assert.property(player, 'color')
      done()
    })
  })

  describe(`functions`, function () {
    it(`update (deltaTime)`, function (done) {
      const deltaTime = 1
      var x = player.x
      var y = player.y
      player.update(deltaTime)

      assert.equal(player.x, x + player.vx * player.speed)
      assert.equal(player.y, y + player.vy * player.speed)

      done()
    })

    it(`setVelocityY(vy)`, function (done) {
      var vy = 100
      player.setVelocityY(vy)
      assert.equal(player.vy, vy)

      done()
    })

    it(`setVelocityX(vx)`, function (done) {
      var vx = 100
      player.setVelocityX(vx)
      assert.equal(player.vx, vx)

      done()
    })
  })
})
