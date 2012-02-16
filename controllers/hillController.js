var mongoose = require('mongoose');

var Hill = mongoose.model('Hill');
var Comment = mongoose.model('Comment');

var data = {};

Hill.find({}, function(err,docs){
	docs.each(function (hill){
		console.log(hill);
		data[hill.name] = hill;	
	});
});

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
	var newHill = req.body;
	
	var hill = new Hill();
	hill.name = newHill.name;
	hill.runs = {};
	hill.runs.green = {
		open: newHill.greenRunsTotal,
		total: newHill.greenRunsTotal,
	};
	hill.runs.blue = {
		open: newHill.blueRunsTotal,
		total: newHill.blueRunsTotal,
	};
	hill.runs.red = {
		open: newHill.redRunsTotal,
		total: newHill.redRunsTotal,
	};
	hill.runs.black = {
		open: newHill.blackRunsTotal,
		total: newHill.blackRunsTotal,
	};
	hill.lifts = {
		open: newHill.totalLifts,
		total: newHill.totalLifts
	}
	hill.comments = [];

	hill.save();
}