var hillsController = require('./controllers/hillController');

exports.get = {
	'/': function(req, res) {
		// if user is not already logged in
		res.render('users/login');
		// else res.render('hills/view', require('./controllers/hill'));
	},
	
	'/hills/new': function(req, res) {
		res.render('hills/new');
	},
	
	'/hills/update/:hillName': function(req, res) {
		if (req.params.hillName) {
			res.render('hills/update', {
				hill: hillsController.hill(req.params.hillName)
			});
		}
	},
	
	'/hills/:hillName': function(req, res) {
		res.render('hills/view', { hills: [hillsController.hill(req.params.hillName)] });
	},
	
	'/hills': function(req, res) {
		res.render('hills/view', { hills: hillsController.hills() });
	}
}

exports.post = {
	'/hills/new': function(req, res) {
		res.render('hills/new');
	}
}
