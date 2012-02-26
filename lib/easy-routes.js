/** Redefines Express' routes syntax.
*
*@author	Matti Schneider-Ghibaudo
*/

/**
*@param	app	Express' app instance
*@param	routesFile	path to a module that exports patterns-handlers mappings
*@param	defaultMethod	if not specified, the mappings apply for all HTTP methods. You can override this by passing, for example, 'get'.
*/
module.exports = function(app, routesFile, defaultMethod) {
	var routes = require(routesFile);
	
	function addRoute(method, pattern, handler) {
		switch (typeof(handler)) {
			
			// standard definition
			case 'function': 
				app[method](pattern, handler);
				break;
				
			// straight view rendering shortcut
			case 'string':
				app[method](pattern, function(req, res) {
					res.render(handler, req.params);
				});
				break;
			
			// several handlers (filters)
			case 'object':
				handler.unshift(pattern);
				app[method].apply(app, handler);
		}
	}

	Object.each(routes, function(handler, pattern) {
		if (handler.get || handler.post || handler.put || handler['delete']) {
		
			// specific HTTP methods
			Object.each(handler, function(actualHandler, method) {
				addRoute(method, pattern, actualHandler);
			});
		} else {
			addRoute(defaultMethod || 'all', pattern, handler);
		}		
	});
}
