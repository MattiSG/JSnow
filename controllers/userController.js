var mongoose = require('mongoose');

var User = mongoose.model('User');

exports.isAuthorized = function(req, res, next) {
	if (req.user && req.user.skimaster) {
		next();
	} else {
		req.flash('error', "Vous n'êtes pas un maître de ski !");
		res.redirect('/hills');	
	}
}

exports.findUserByID = function(id) {
	User.findOne({ "_id": id }, function(err, user) {
		if (err)
			throw err;
	});
}