// Module dependencies
var mongoose      = require('mongoose'),
    Schema        = mongoose.Schema,
    mongooseAuth  = require('mongoose-auth'),
    everyauth 	  = require('everyauth'),
    Promise 	    = everyauth.Promise,
    express       = require('express'),
		mootools = require('./lib/mootools-core');

// Models
require('./models/user');
require('./models/hill');
require('./models/comment');

User = mongoose.model('User');

// DB Connect
mongoose.connect('mongodb://localhost/JSnow');

// App
var app = module.exports = express.createServer();

mongoose.model('Hill').find({}, function(err, docs){
	if (!docs.length) require('./models/populate')();
});

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
  app.use(require('stylus').middleware({ src: __dirname + '/public' }));
	app.set('view options', {
		open: '<<',
		close: '>>'
	});
});

app.configure('development', function(){
	app.use(express.errorHandler({ dumpExceptions: true, showStack: true })); 
});

app.configure('production', function(){
	app.use(express.errorHandler()); 
});

// Start
require('./lib/easy-routes')(app, __dirname + '/routes');
everyauth.debug = true;
mongooseAuth.helpExpress(app);
app.dynamicHelpers({ messages: require('express-messages') });
app.listen(3000);
console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
