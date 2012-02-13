var data = require('../models/hillMockup.js');

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
	//TODO
}