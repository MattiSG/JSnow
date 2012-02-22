var hillsController = require('./controllers/hillController');
var usersController = require('./controllers/userController');
module.exports = {
	'/': 'home',
	
	'/home': 'home',
	
	'/hills/new': {
		get: [usersController.isAuthorized, hillsController.newHill],
		post: [usersController.isAuthorized, hillsController.create]
	},
	
	'/hills/update/:hillName': {
		get: [usersController.isAuthorized, hillsController.updateForm],
		post: [usersController.isAuthorized, hillsController.update]
	},
	
	'/hills/:hillName/comment': {
		get: hillsController.newCommentForm,
		post: hillsController.newComment
	},
	
	'/hills/:hillName': hillsController.viewHill,
	
	'/hills': hillsController.viewAll
}
