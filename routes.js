var hillsController = require('./controllers/hillController');

exports.get = {
	'/': 'users/login',
	
	'/hills/new': 'hills/new',
	
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
	'/hills/new': 'hills/new'
}
