var server = require('http').createServer();
var socket = require('socket.io')
var EventEmitter = require('eventemitter3')

function Server (opts) {
	var io = socket(server);

	var emitter = new EventEmitter()

	io.on('connection', function(client){
		emitter.emit('connect', client)

		client.on('event', function(data){
			emitter.emit('event', data)
		});

		client.on('disconnect', function(){
			emitter.emit('disconnect', client)
		});
	});

	server.listen(3000);

	this.io = io
	this.emitter = emitter

	return this
}

module.exports = Server
