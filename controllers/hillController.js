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

fillData();

function unflat(from){
	var to = {};
	var elem = "", lastElem = null, before = null;
	Object.each(from, function(val, key){
		var hierarchy = key.split('.');
		while (hierarchy.length != 1) {
			elem = hierarchy.shift();
			before = lastElem || to;
			console.log("we set "+before+"[\""+elem+"\"]");
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
	res.render('hills/update', { hill: data[req.params.hillName] });
}

exports.viewAll = function(req, res) {
	res.render('hills/view', { hills: Object.values(data) });
}

exports.viewHill = function(req, res) {
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
			res.render('hills/view', { hills: Object.values(data) });
		else
			res.render('hills/new');
	});
}