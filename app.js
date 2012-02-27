// Module dependencies
var mongoose  		= require('mongoose'),
	Schema			= mongoose.Schema,
	mongooseAuth	= require('mongoose-auth'),
	everyauth		= require('everyauth'),
	Promise			= everyauth.Promise,
	express			= require('express'),
	mootools		= require('./lib/mootools-core');

// Models inclusion
require('./models/hill');
require('./models/user');
User = mongoose.model('User');

// DB connection and potential population
mongoose.connect('mongodb://localhost/JSnow'); // TODO: the server should be refactored in a config file

mongoose.model('Hill').find({}, function(err, docs) {
	if (! docs.length)
		require('./models/populate')();
});

// Web framework instance
var app = module.exports = express.createServer();

// Configuration
app.configure(function(){
	app.set('views', __dirname + '/views');
	app.set('view engine', 'ejs');
	app.use(express.bodyParser());
	app.use(express.methodOverride());
	app.use(express.cookieParser());
	app.use(express.logger());
	app.use(express.session({ secret: 'JSnow'}));
	app.use(mongooseAuth.middleware());
	app.use(express.static(__dirname + "/public"));
	app.set('view options', {
		open: '<<',	// redefining EmbeddedJS opening / closing tags to something easier to type
		close: '>>'
	});
	app.dynamicHelpers({ messages: require('express-messages') });
});

app.configure('development', function(){
	app.use(express.errorHandler({ dumpExceptions: true, showStack: true })); 
});

app.configure('production', function(){
	app.use(express.errorHandler()); 
});

// WebSockets setup
require('./controllers/sockets.js').setup(app);

// Routes setup
require('./lib/easy-routes')(app, __dirname + '/routes');

// Startup
everyauth.debug = true;
mongooseAuth.helpExpress(app);
app.listen(3000); // TODO: the port should be put in a config file
console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
