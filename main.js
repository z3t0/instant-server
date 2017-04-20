const Game = require('./game.js')
const Server = require('./server.js')

const server = Server({port:8080})
const game = new Game({server:server})
