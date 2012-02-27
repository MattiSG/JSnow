/** Manages websockets through socket.io to send events to all connected clients.
*
*@author	Matti Schneider-Ghibaudo
*/

/** Stores a socket for each connected client.
*/
var sockets = [];

/** Listens to incoming connections and updates the `sockets` list accordingly.
* To be used by the including `app` Express instance.
*/
exports.setup = function socketSetup(app) {
	var socketio = require('socket.io').listen(app);
	
	socketio.sockets.on('connection', function(socket) {
		sockets.push(socket);
		
		socket.on('disconnect', function() {
			sockets.erase(socket);
		});
	});
}

/** Sends a `hillUpdate` event to all connected sockets.
*
*@param	hillName	identifier (name) of the hill model that was updated.
*/
exports.pushUpdate = function pushUpdate(hillName) {
	sockets.each(function(socket) {
		socket.emit('hillUpdate', hillName);
	});
}
