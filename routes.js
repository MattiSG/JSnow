var hillsController = require('./controllers/hillController');

module.exports = {
	'/': 'users/login',
	
	'/hills/new': {
		get: 'hills/new',
		post: hillsController.create
	},
	
	'/hills/update/:hillName': hillsController.update,
	
	'/hills/:hillName': hillsController.viewHill,
	
	'/hills': hillsController.viewAll
}
