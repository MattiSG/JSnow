/** hill model.
*
*@author	Jeremy Gabriele
*/

var mongoose     = require('mongoose'),
    Schema       = mongoose.Schema,
    ObjectId = Schema.ObjectId;


var CommentSchema = require('./comment').schema;

// Hill schema
var HillSchema = new Schema({
  name: String,
  comments: [CommentSchema], // this is a list of embedded documents
  runs: {
  	green: {
  		open: {type: Number, min: 0},
  		total: {type: Number, min: 0},
  	},
  	blue: {
  		open: {type: Number, min: 0},
  		total: {type: Number, min: 0},
  	},
  	red: {
  		open: {type: Number, min: 0},
  		total: {type: Number, min: 0},
  	},
  	black: {
  		open: {type: Number, min: 0},
  		total: {type: Number, min: 0},
  	}
  },
  snowCover: {
  	top: {type: Number, min: 0},
  	bottom: {type: Number, min: 0},
  },
  lifts: {
  	open: {type: Number, min: 0},
  	total: {type: Number, min: 0},
  },
  lastUpdate: {type: Date, default: Date.now}
});

mongoose.model('Hill', HillSchema);