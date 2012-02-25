var mongoose = require('mongoose');

var hillController = require('./hillController');

var Comment = mongoose.model('Comment');
var utils = require('../lib/utils');

// NEW COMMENT POST -> /hills/:hillName/comment
exports.newComment = function(req, res) {
	
	var from = utils.unflat(req.body);
	var comment = new Comment();
	
	Object.each(from, function(val, key){
		comment[key] = val;
	});
	
	comment.tags = [];
	
	if (from.rocailleuse) comment.tags.push("rocailleuse");
	if (from.poudreuse) comment.tags.push("poudreuse");
	if (from.artificielle) comment.tags.push("artificielle");
	if (from.dure) comment.tags.push("dure");
	if (from.soupe) comment.tags.push("soupe");
	
	if (comment.donotmark) {
		comment['mark'] = null;
	}
	
	if (req.user) {
		comment.who = req.user.firstName + " " + req.user.lastName;
	}
	
	comment.save(function(err){
		if (err) {
			req.flash('error', err);
			res.redirect('/hills/'+req.params.hillName+'/comment');
		}
		if (!err) {
			hillController.addCommentToHill(comment._id, req.params.hillName);
			req.flash('info', 'Votre commentaire a bien été ajouté');
			res.redirect('/hills');
		}
	});
}

exports.findAllCommentsForHill = function(hill) {
	hill.commentsID.each(function(comID){
		Comment.findById(comID, function(err, com){
			hill.comments.push(com); // /!\ risque pb asynchrone !
		});
	});
	return hill;
}

exports.getAverageMarkForHill = function(hill) {
	var average = 0;
	var nbComments = 0;
	hill.commentsID.each(function(comID){
		Comment.findById(comID, function(err, com){
			if (com.mark) {
				//nbComments++;
				//average += com.mark;
			}
		});
	});
	return average;
}