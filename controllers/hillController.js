/* hill controller. Provides all method to access, update and create hills
*@author	Jeremy Gabriele
*/
var mongoose = require('mongoose'),
	sockets = require('./sockets');

var Hill = mongoose.model('Hill');
var Comment = mongoose.model('Comment');

var nbAccess = 0; // total number of pages hits (when user get to a page, this number gets increase by 1)

//TODO: these variables should be refactored in a config module
var COMMENT_TIMEOUT = 3 * 60 * 1000,	// how long (in ms) before a comment is considered old (a candidate for pruning)
	COMMENT_PRUNING_FREQUENCY = 2, // we'll clean old comments every nth request
	POSSIBLE_TAGS = ['rocailleuse', 'poudreuse', 'artificielle', 'dure', 'soupe'];
	
	
exports.cleanOldComments = function(req, res, next) {
	if ((++nbAccess) % COMMENT_PRUNING_FREQUENCY)
		return next();
		
	// every COMMENT_PRUNING_FREQUENCY requests
	// prune old comments
	
	Hill.find({}, function(err, hills) {
		if (err) throw err;
		
		var updatedHills = [],
			oldestAllowedDate = new Date() - COMMENT_TIMEOUT;
					
		hills.each(function(hill) {
			hill.comments.each(function removeOldCommentIfNecessary(comment) {
				if (comment.creationDate > oldestAllowedDate)
					return;	// this comment is not old enough to be pruned
					
				comment.remove();
				hill.save(function(err) {
					if (err)
						throw console.log("error while removing old comment: ", err);
				});
				
				updatedHills.push(hill);
			});
		});

		updateAverages(updatedHills);
	});
	
	next();
}

function updateAverages(hills) {
	hills.each(function(hill) {
		var total = 0,
			count = 0;
		hill.comments.each(function(comment) {
			if (comment.mark) {
				total += comment.mark;
				count++;
			}
		});
		
		hill.mark = (count == 0) ? undefined : (total / count).toFixed(1);
	});
}

// unflatten transform object with properties like obj["a.b.c"] in obj[a][b][c]
function unflatten(from) {
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
	
	var newHillValues = unflatten(req.body); // req.body has all POST values
	newHillValues.name = req.params.hillName;
	
	// newHillValues.runs only contains the "open" values (from POST values)
	// we don't want to lose all the "total" values if we update the whole "runs" property.
	Hill.findOne({name: newHillValues.name}, function(err, doc){
		if (err) throw err;
		var runs = doc.runs;
		var colors = ['green', 'blue', 'red', 'black'];
		colors.each(function(color){
			if (newHillValues.runs[color].open)
				newHillValues.runs[color].total = runs[color].total; // backup "total" property
		});
		
		if (newHillValues.lifts.open)
			newHillValues.lifts.total = doc.lifts.total; // ... same for lifts
			
		newHillValues.lastUpdate = new Date();
		
		Hill.update({name: newHillValues.name}, newHillValues, null, function(err) { 
			if (!err) {
				req.flash('info', newHillValues.name+' a bien été mis à jour');
				res.redirect('/hills');
				
				sockets.pushUpdate(req.params.hillName);
			} else {
				req.flash('error', err);
			}
		});
	});
}

exports.updateForm = function(req, res) {
	Hill.findOne({name: req.params.hillName}, function(err,doc){
		if (!err) res.render('hills/update', { hill: doc });
	});
}

exports.viewAll = function(req, res) {
	Hill.find({}, function(err,docs){
		if (!err) {
			updateAverages(docs);
			res.render('hills/view', { hills: Object.values(docs) });
		}
	});
}

exports.viewHill = function(req, res) {
	Hill.findOne({name: req.params.hillName}, function(err,doc){
		if (!err) {
			updateAverages([ doc ]);
			res.render('hills/view', { hills: [ doc ] });
		}
	});
}

exports.viewRawHill = function(req, res) {
	Hill.findOne({name: req.params.hillName}, function(err, hill) {
		if (!err) {
			updateAverages([ hill ]);
			res.partial('hills/_hill', [ hill ]);
		}
	});	
}

exports.newHill = function(req, res) {
	res.render('hills/new');
}

exports.create = function(req, res) {
	var from = unflatten(req.body);
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
	Hill.findOne({name: req.params.hillName}, function(err,doc){
		if (!err) res.render('comments/new', { hill: doc });
	});
}

exports.newComment = function(req, res) {
	var from = unflatten(req.body);
	var comment = new Comment();
	
	Object.each(from, function(val, key) {
		comment[key] = val;
	});
	
	comment.tags = [];
	// we iterate over tag list from POST values
	for (var tagKey in POSSIBLE_TAGS)
		if (POSSIBLE_TAGS.hasOwnProperty(tagKey))
			if (from[POSSIBLE_TAGS[tagKey]])
				comment.tags.push(POSSIBLE_TAGS[tagKey]);
	
	comment.date = new Date();
	
	comment.author = req.user
					 ? req.user.firstName + " " + req.user.lastName
					 : 'Anonyme';
	
	// update hill's comments
	Hill.findOne({name: req.params.hillName}, function(err, doc) {
		var newCommentList = doc.comments;
		newCommentList.push(comment);
		Hill.update(
			{ name: doc.name },
			{
				comments: newCommentList,
				lastUpdate: new Date()
			}, null, function(err) {
				if (!err) {
					req.flash('info', 'Votre commentaire a bien été ajouté');
					res.redirect('/hills');
				} else {
					req.flash('error', err);
					res.redirect('/hills/'+req.params.hillName+'/comment');
				}
			}
		);
	});
	
	sockets.pushUpdate(req.params.hillName);
}
