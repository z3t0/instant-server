var assert = require('chai').assert
var io = require('socket.io-client')

const Server = require('../server.js')
var client = null
var wrapper = null

describe('Server', function () {
  var server = new Server({port: 3000})

  describe('constructor', function () {
    it(`should have 'io' property`, function (done) {
      assert.property(server, 'io')
      done()
    })

    it(`should have 'emitter' property`, function (done) {
      assert.property(server, 'emitter')
      done()
    })

    it(`should have 'http' property`, function (done) {
      assert.property(server, 'http')
      done()
    })

    it(`should have 'port' property`, function (done) {
      assert.property(server, 'port')
      done()
    })
  })

  describe('connect, send, receive', function () {
    it(`should receive 'connect' event`, function (done) {
      this.timeout(1000)

      client = io.connect('http://localhost:3000')
      server.emitter.on('connect', (data) => {
        wrapper = data
        assert.typeOf(wrapper, 'object', `wrapper returned is not 'object'`)
        assert.typeOf(wrapper.emit, 'function', `wrapper.emit is not  'function'`)
        done()
      })
    })

    it(`should receive 'up' event`, function (done) {
      this.timeout(1000)

      client.emit('up')
      server.emitter.on('up', (data) => {
        done()
      })
    })

    it(`should receive 'down' event`, function (done) {
      this.timeout(1000)

      client.emit('down')
      server.emitter.on('down', (data) => {
        done()
      })
    })

    it(`should receive 'left' event`, function (done) {
      this.timeout(1000)

      client.emit('left')
      server.emitter.on('left', (data) => {
        done()
      })
    })

    it(`should receive 'right' event`, function (done) {
      this.timeout(1000)

      client.emit('right')
      server.emitter.on('right', (data) => {
        done()
      })
    })

    it(`should be able to send data back through 'wrapper.emit(msg, data)'`, function(done) {
      wrapper.emit('test', 1)
      client.on('test', (data) => {
        assert.equal(data, 1, `data received is not '1'`)
        done()
      })
    })
    
    it(`should receiver 'disconnect' event`, function (done) {
      this.timeout(1000)

      client.disconnect()
      server.emitter.on('disconnect', (data) => {
        done()
      })
    })

  })
})
