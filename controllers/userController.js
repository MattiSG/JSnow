/** user controller. Provide a method to check the status of a user
*
*@author	Jeremy Gabriele
*/

var mongoose = require('mongoose');

var User = mongoose.model('User');

// module method to check whether user is a skimaster or not
exports.isAuthorized = function(req, res, next) {
	if (req.user && req.user.skimaster) { // req.user provided by mongoose-auth
		next();
	} else {
		req.flash('error', "Vous n'êtes pas un maître de ski !");
		res.redirect('/hills');	
	}
}