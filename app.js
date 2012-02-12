		
/**
 * Module dependencies.
 */

<<<<<<< HEAD
var mongoose      = require('mongoose'),
    Schema        = mongoose.Schema,
    mongooseAuth  = require('mongoose-auth'),
    everyauth 	  = require('everyauth'),
    Promise 	    = everyauth.Promise,
    express       = require('express');

// Mongoose setup
var UserSchema = new Schema({
  name:String,
  lastname:String
});

UserSchema.plugin(mongooseAuth, {
    everymodule: {
      everyauth: {
        User: function () {
          return User;
        }
      }
    },
    password: {
      loginWith: 'email', //loginWith: 'phone' also possible
      
      extraParams:{
        name:{
          first:String,
          last:String
        }
      },

      everyauth: {
            getLoginPath: '/login'
          , postLoginPath: '/login'
          , loginView: 'login.ejs'
          , getRegisterPath: '/register'
          , postRegisterPath: '/register'
          , registerView: 'register.ejs'
          , loginSuccessRedirect: '/'
          , registerSuccessRedirect: '/'
        }
    }
});

mongoose.model('User', UserSchema);

mongoose.connect('mongodb://localhost/JSnow');

User = mongoose.model('User');

var app = module.exports = express.createServer();

// STEP 3: Add in Dynamic View Helpers (only if you are using express)
mongooseAuth.helpExpress(app);

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

// Routes

app.get('/', function (req, res) {
  console.log(req.loggedIn);
  res.render('home');
});

app.get('/special', function(req,res) {
  var haha = req.url;
  res.render('specialContent', {val: haha});
});

// start

mongooseAuth.helpExpress(app);
app.listen(3000);
console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
