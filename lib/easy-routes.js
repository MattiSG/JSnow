/** Redefines Express' routes syntax.
*
*@author	Matti Schneider-Ghibaudo
*/

module.exports = function(app, routesFile) {
	var routes = require(routesFile);

	Object.each(routes, function(mappings, method) {
		Object.each(mappings, function(handler, pattern) {
			switch (typeof(handler)) {
				// standard definition
				case 'function': 
					app[method](pattern, handler);
					break;
					
				// straight view rendering shortcut
				case 'string':
					app[method](pattern, function(req, res) {
						res.render(handler);
					});
					break;
				
				// array of functions for restriction
				case 'object':
					handler.unshift(pattern);
					app[method].apply(app, handler);
			}
		});
	});
}
