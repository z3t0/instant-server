var assert = require('chai').assert
var io = require('socket.io-client')
var sinon = require('sinon')

const Player = require('../player.js')
var client = {'id': 1}

describe('Player', function () {
  var player = new Player({client: client})

  describe('constructor', function () {

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
      assert.property(player, 'sizeX')
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

    it(`send(msg, data)`, function(done) {
      let spy = sinon.spy()
      player.emit = spy

      player.send('test', 'data')
      assert(player.emit.calledOnce, 'emit not called')
      assert(spy.calledWithExactly('test', 'data'))

      done()
    })

    it(`getPlayerInfo()`, function(done) {
      let info = player.getPlayerInfo()

      assert.property(player, 'id', 'getPlayerInfo() returns id')
      assert.property(player, 'x', 'getPlayerInfo() returns x')
      assert.property(player, 'y', 'getPlayerInfo() returns y')
      assert.property(player, 'sizeX', 'getPlayerInfo() returns sizeX')
      assert.property(player, 'sizeY', 'getPlayerInfo() returns sizeY')
      assert.property(player, 'vx', 'getPlayerInfo() returns vx')
      assert.property(player, 'vy', 'getPlayerInfo() returns vy')
      assert.property(player, 'speed', 'getPlayerInfo() returns speed')
      assert.property(player, 'color', 'getPlayerInfo() returns color')

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
