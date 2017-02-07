var server = require('./server.js')({port: 8080})

var Game = require('./game.js')({server: server})
