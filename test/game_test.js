var assert = require('chai').assert

const Game = require('../game.js')
const Server = require('../server.js')


describe('Game', function () {
  var server = new Server({port: 2000})
  var game = new Game({ server: server})

  describe(`constructor`, function() {
    it(`should have 'players' property`, function(done) {
      assert.property(game, 'players', `does not have 'players' property`)
      assert.typeOf(game.players, 'object', `'players' is not of type object`)
      assert.property(game, 'server', `does not have 'server' property`)
      done()
    })
  })

  describe(`functions`, function() {
    it(`init()`, function(done) {
      done()
    })

    it(`log`, function(done) {
      var msg = game.log('test')
      assert.equal(msg, 'Game > test', `log does not output 'test'`)
      done()
    })
  })
})
