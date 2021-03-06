/** These routes are defined with EasyRoutes syntax.
*
*/

var hillsController = require('./controllers/hillController'),
	usersController = require('./controllers/userController');

module.exports = {
	'/': hillsController.viewAll,
	
	'/hills/new': {
		get: [
				hillsController.cleanOldComments,
				usersController.isAuthorized,
				hillsController.newHill
		],
		post: [
				usersController.isAuthorized,
				hillsController.create
		]
	},
	
	'/hills/update/:hillName': {
		get: [
				hillsController.cleanOldComments,
				usersController.isAuthorized,
				hillsController.updateForm
		],
		post: [
				hillsController.cleanOldComments,
				usersController.isAuthorized,
				hillsController.update
		]
	},
	
	'/hills/:hillName/comment': {
		get: [
				hillsController.cleanOldComments,
				hillsController.newCommentForm
		],
		post: [
				hillsController.cleanOldComments,
				hillsController.newComment
		]
	},
	
	'/hills/:hillName': [
			hillsController.cleanOldComments,
			hillsController.viewHill
	],
	
	'/hills/raw/:hillName': hillsController.viewRawHill,
	
	'/hills': [
			hillsController.cleanOldComments,
			hillsController.viewAll
	]
}
