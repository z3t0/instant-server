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
    it (`getPlayerInfo()`, function(done) {
      var info = player.getPlayerInfo()

      assert.equal(info.id, player.id, 'id is not 1')
      assert.equal(info.x, player.x, 'x is not 0')
      assert.equal(info.y, player.y, 'y is not 0')
      assert.equal(info.sizeX, player.sizeX, 'sizeZ is not 0.05')
      assert.equal(info.sizeY, player.sizeY, 'sizeY is not 0.05')
      assert.equal(info.vx, player.vx, 'vx is not 0')
      assert.equal(info.vy, player.vy, 'vx is not 1')
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

    it(`update (deltaTime)`, function (done) {
      const deltaTime = 1
      var x = player.x
      var y = player.y
      player.update(deltaTime)

      assert.equal(player.x, x + player.vx * player.speed)
      assert.equal(player.y, y + player.vy * player.speed)

      done()
    })
  })
})
