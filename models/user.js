/** user model
*@author	Jeremy Gabriele
*/

var mongoose      = require('mongoose'),
    Schema        = mongoose.Schema,
    mongooseAuth  = require('mongoose-auth');

// We define a schema for user.
// seems confusing as mongodb is schemaless but mongoose ODM require it.
var UserSchema = new Schema({
  name:String,
  lastname:String
});

// user schema is augmented by mongoose-auth
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
      	firstName:String,
      	lastName:String,
      	skimaster:String
     	},

			// define all the routes and associated views about login/register
      everyauth: {
            getLoginPath: '/users/login'
          , postLoginPath: '/users/login'
          , loginView: 'users/login.ejs'
          , getRegisterPath: '/users/register'
          , postRegisterPath: '/users/register'
          , registerView: 'users/register.ejs'
          , loginSuccessRedirect: '/'
          , registerSuccessRedirect: '/'
        }
    }
});

// register the model schema so we can acess it and create new users with mongoose.model('User').
// /!\ The collection will not be created until the first value is inserted !
mongoose.model('User', UserSchema);
