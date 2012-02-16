
/**
 * Module dependencies.
 */

var express = require('express'),
	mootools = require('./lib/mootools-core'),
	mongoose = require('mongoose');

var app = module.exports = express.createServer();

// require
require('./models/hill');

// db
mongoose.connect('mongodb://localhost/JSnow');

mongoose.model('Hill').find({}, function(err, docs){
	console.log(docs);
	if (!docs.length) require('./models/populate')();
});

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
