var mongoose      = require('mongoose'),
    Schema        = mongoose.Schema,
    mongooseAuth  = require('mongoose-auth');

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
      	firstName:String,
      	lastName:String,
      	skimaster:String
     	},

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

mongoose.model('User', UserSchema);
