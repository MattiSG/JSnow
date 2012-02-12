
/**
 * Module dependencies.
 */

var express = require('express'),
	routes = require('./routes');

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

// Routes

app.get('/', routes.login);

//users'
app.get('/login', routes.login);
app.get('/register', routes.register);

//hills'
app.get('/hills', routes.hills);
app.get('/hills/:id', routes.hills);
app.get('/hills/update/:id', routes.hills_update);


app.listen(3000);
console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
