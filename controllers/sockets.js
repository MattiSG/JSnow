var sockets = [];

exports.setup = function socketSetup(app) {
	var socketio = require('socket.io').listen(app);
	
	socketio.sockets.on('connection', function(socket) {
		sockets.push(socket);
		
		socket.on('disconnect', function() {
			sockets.erase(socket);
		});
	});
}

exports.pushUpdate = function pushUpdate(hillName) {
	sockets.each(function(socket) {
		socket.emit('hillUpdate', hillName);
	});
}
