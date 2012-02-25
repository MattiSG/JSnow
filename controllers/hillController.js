var mongoose = require('mongoose');

var Hill = mongoose.model('Hill');

var UserController = require('./userController');
var CommentController = require('./commentController');

var utils = require('../lib/utils');

var data = {};

// Get all hills and fill data object.
function fillData(){
	Hill.find({}, function(err,docs){
		docs.each(function (hill){
			data[hill.name] = hill;
			data[hill.name].comments = [];
			data[hill.name] = CommentController.findAllCommentsForHill(data[hill.name]);
		});
	});
}

// VIEW ALL HILLS GET -> /hills
exports.viewAll = function(req, res) {
	
	fillData();
	
	res.render('hills/view', { hills: Object.values(data) });
}

// VIEW HILL GET -> /hills/:hillName
exports.viewHill = function(req, res) {
	
	fillData();
	
	res.render('hills/view', { hills: [ data[req.params.hillName] ] });
}

// NEW HILL GET -> /hills/new
exports.viewHill = function(req, res) {
	
	fillData();
	
	res.render('hills/new');
}

// NEW HILL POST -> /hills/new
exports.create = function(req, res) {
	var from = utils.unflat(req.body);
	var hill = new Hill();
	
	Object.each(from, function(val, key){
		hill[key] = val;
	});
	
	hill.save(function(err) { 
		if (!err) {
			req.flash('info', 'Nouvelle station ajoutée');
			res.redirect('/hills');
		} else {
			req.flash('error', err);
		}
	});
}

// UPDATE GET -> /hills/update/:hillName
exports.updateForm = function(req, res) {
	
	fillData();
	
	res.render('hills/update', { hill: data[req.params.hillName] });
}

// UPDATE POST -> /hills/update/:hillName
exports.update = function(req, res) {
	
	var newHillValues = utils.unflat(req.body);
	
	// we don't want to lose total values
	Hill.findOne({name: newHillValues.name}, function(err, doc){
		var runs = doc.runs;
		var colors = ['green','blue','red','black']; // bugfix, cannot use Object.each(runs,f).
		colors.each(function(color){
			if (newHillValues.runs[color].open != null) {
				newHillValues.runs[color].total = runs[color].total;
			}
		});
		if (newHillValues.lifts.open != null)　newHillValues.lifts.total = doc.lifts.total;
		newHillValues.lastUpdate = new Date();
		Hill.update({name: newHillValues.name}, newHillValues, null, function(err) { 
			if (!err) {
				req.flash('info', newHillValues.name+' a bien été mis à jour');
				res.redirect('/hills');
			} else {
				req.flash('error', err);
			}
		});
	});	
}

// NEW COMMENT GET -> /hills/:hillName/comment
exports.newCommentForm = function(req, res) {
	res.render('comments/new', { hill: data[req.params.hillName] });
}

exports.addCommentToHill = function(commentID, hillName){
	
	Hill.findOne({name: hillName}, function(err, hill) {
		if (!err) {
			hill.commentsID = hill.commentsID || [];
			hill.commentsID.push(commentID);
			
			Hill.update({name: hill.name}, {commentsID: hill.commentsID}, null, function(err) { 
				if (err) console.log(err);
			});
		}
	});	
	
}