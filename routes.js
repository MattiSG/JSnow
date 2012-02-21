var hillsController = require('./controllers/hillController');
var usersController = require('./controllers/userController');
module.exports = {
	'/': 'home',
	
	'/home': 'home',
	
	'/hills/new': {
		get: 'hills/new',
		post: hillsController.create
	},
	
	'/hills/update/:hillName': [usersController.isAuthorized, hillsController.update],
	
	'/hills/:hillName/comment': {
		get: hillsController.newCommentForm,
		post: hillsController.newComment
	},
	
	'/hills/:hillName': hillsController.viewHill,
	
	'/hills': hillsController.viewAll
}
