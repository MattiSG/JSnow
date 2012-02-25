var mongoose = require('mongoose');

var Hill = mongoose.model('Hill');
var Comment = mongoose.model('Comment');

var UserController = require('./userController');

var data = {};

function fillData(){
	Hill.find({}, function(err,docs){
		docs.each(function (hill){
			data[hill.name] = hill;	
		});
	});
}

function unflat(from){
	var to = {};
	var elem = "", lastElem = null, before = null;
	Object.each(from, function(val, key){
		var hierarchy = key.split('.');
		while (hierarchy.length != 1) {
			elem = hierarchy.shift();
			before = lastElem || to;
			if (!before[elem]) before[elem] = {};
			lastElem = before[elem];
		}
		if (lastElem)
			lastElem[hierarchy[0]] = val;
		else
			to[key] = val;
		
		before = null;
		lastElem = null;
	});
	
	return to;
}

exports.update = function(req, res) {
	
	var newHillValues = unflat(req.body);
	
	// we don't want to lose total values
	Hill.findOne({name: newHillValues.name}, function(err, doc){
		var runs = doc.runs;
		var colors = ['green','blue','red','black']; // bugfix, cannot use Object.each(runs).
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

exports.updateForm = function(req, res) {
	
	fillData();
	
	res.render('hills/update', { hill: data[req.params.hillName] });
}

exports.viewAll = function(req, res) {
	
	fillData();
	
	res.render('hills/view', { hills: Object.values(data) });
}

exports.viewHill = function(req, res) {
	
	fillData();
	
	res.render('hills/view', { hills: [ data[req.params.hillName] ] });
}

exports.viewHill = function(req, res) {
	res.render('hills/new');
}

exports.create = function(req, res) {
	var from = unflat(req.body);
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

exports.newCommentForm = function(req, res) {
	res.render('comments/new', { hill: data[req.params.hillName] });
}

exports.newComment = function(req, res) {
	
	var from = unflat(req.body);
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
	
	console.log(comment.tags);
	
	if (comment.donotmark) {
		comment['mark'] = null;
	}
	
	if (req.user) {
		comment.who = req.user.firstName + " " + req.user.lastName;
	}
	
	Hill.findOne({name: req.params.hillName}, function(err, doc) {
		var newCommentList = doc.comments;
		newCommentList.push(comment);
		Hill.update({name: doc.name}, {comments: newCommentList}, null, function(err){
			if (err) {
				req.flash('error', err);
				res.redirect('/hills/'+req.params.hillName+'/comment');
			}
			if (!err) {
				req.flash('info', 'Votre commentaire a bien été ajouté');
				res.redirect('/hills');
			}
		});
	});
}