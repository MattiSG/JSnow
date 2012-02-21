var mongoose     = require('mongoose'),
    Schema       = mongoose.Schema;

// Enum
var Tag = new Schema({
	value: {type: String, enum: ['rocailleuse', 'poudreuse', 'artificielle', 'dure', 'soupe']}
});
mongoose.model('Tag', Tag);

// Comment schema
var CommentSchema = new Schema({
  content: String,
  mark: {type: Number, min: 0, max: 4, default: -1},
  who: {type: String},
  date: {type: Date, default: Date.now},
  tags: {type: String, enum: ['rocailleuse', 'poudreuse', 'artificielle', 'dure', 'soupe']}
});
mongoose.model('Comment', CommentSchema);

exports.schema = CommentSchema