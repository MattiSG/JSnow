var mongoose = require('mongoose');

var Hill = mongoose.model('Hill');
var Comment = mongoose.model('Comment');

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
	
	fillData();
	
	if (req.originalMethod == "POST") {
		var hill = data[req.params.hillName];
		var from = unflat(req.body);
		
		Object.each(from, function(val, key){
			hill[key] = val;
		});
		
		hill.save(function(err) { 
			if (!err)
				res.redirect('/hills');
		});
	}
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

exports.create = function(req, res) {
	var from = unflat(req.body);
	var hill = new Hill();
	
	Object.each(from, function(val, key){
		hill[key] = val;
	});
	
	hill.save(function(err) { 
		if (!err)
			res.redirect('/hills');
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
	
	Hill.find({name: req.params.hillName}, function(err, doc) {
		doc[0].comments.push(comment);
		console.log(doc);
		doc[0].save(function(err){
			console.log(err);
			if (!err) {
				res.redirect('/hills/'+req.params.hillName);
			}
		});
	});
	
	
}