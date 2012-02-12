
// users

exports.register = function(req, res) {
	res.render('users/register')
};

exports.login = function(req, res) {
  // if user is not already logged in
	res.render('users/login')
	// else res.render('hills/view', require('./controllers/hill'));
};


// hills

exports.hills = function(req, res) {
  if (req.params.id) {
    res.render('hills/view', {
      hills: [require('./controllers/hill').hills[parseInt(req.params.id)]] // -__-...
    })
  }
	else
	  res.render('hills/view', require('./controllers/hill'))
};

exports.hills_create = function(req, res) {
	res.render('hills/create')
};

exports.hills_update = function(req, res) {
  if (req.params.id) {
    res.render('hills/view', {
      hills: [require('./controllers/hill').hills[parseInt(req.params.id)]] // -__-...
    })
  }
};