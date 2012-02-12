var mongoose     = require('mongoose'),
    Schema       = mongoose.Schema,
    mongooseAuth = require('mongoose-auth');

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