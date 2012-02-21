var mongoose     = require('mongoose'),
    Schema       = mongoose.Schema,
    ObjectId = Schema.ObjectId;

// Comment schema
var CommentSchema = new Schema({
	title: {type: String, default: ""},
  content: String,
  mark: {type: Number, min: 0, max: 4, default: -1},
  userID: ObjectId,
  date: {type: Date, default: Date.now}
  //tags: {type: enum, {'rocky']}
});
mongoose.model('Comment', CommentSchema);

// Hill schema
var HillSchema = new Schema({
  name: String,
  mark: {type: Number, min: 0, default: -1},
  snowType: {type: String, default: ""},
  comments: [CommentSchema],
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