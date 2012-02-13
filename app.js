
/**
 * Module dependencies.
 */

var express = require('express'),
	mootools = require('./lib/mootools-core');

var app = module.exports = express.createServer();

// Configuration

app.configure(function(){
	app.set('views', __dirname + '/views');
	app.set('view engine', 'ejs');
	app.set('view options', {
		open: '<<',
		close: '>>'
	});
	app.use(express.bodyParser());
	app.use(express.methodOverride());
	app.use(require('stylus').middleware({ src: __dirname + '/public' }));
	app.use(app.router);
	app.use(express.static(__dirname + '/public'));
});

app.configure('development', function(){
	app.use(express.errorHandler({ dumpExceptions: true, showStack: true })); 
});

app.configure('production', function(){
	app.use(express.errorHandler()); 
});

require('./lib/easy-routes')(app, __dirname + '/routes');

app.listen(3000);
console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
