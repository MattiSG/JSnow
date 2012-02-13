
// users

exports.register = function(req, res) {
	res.render('users/register');
};

exports.login = function(req, res) {
  // if user is not already logged in
	res.render('users/login');
	// else res.render('hills/view', require('./controllers/hill'));
};


// hills

var hillsController = require('./controllers/hill');

exports.hills = function(req, res) {
	if (req.params.hillName) {
		res.render('hills/view', {
			hills: [hillsController.hill(req.params.hillName)]
    });
	} else {
		res.render('hills/view', {
			hills: hillsController.hills()
		});
	}
};

exports.hills_new = function(req, res) {
	res.render('hills/new');
};

exports.hills_create = function(req, res) {
	console.log(req.body); // infos du post
};

exports.hills_update = function(req, res) {
  if (req.params.hillName) {
    res.render('hills/update', {
			hill: hillsController.hill(req.params.hillName)
    });
  }
};