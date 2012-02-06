
exports.index = function(req, res) {
	res.render('index', require('./controllers/hill'))
};