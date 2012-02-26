var mongoose     = require('mongoose'),
    Schema       = mongoose.Schema;

// Comment schema
var CommentSchema = new Schema({
  content: String,
  mark: {type: Number, min: 0, max: 4, default: -1},
  author: {type: String},
  creationDate: {type: Date, default: Date.now},
  tags: [String]
});
mongoose.model('Comment', CommentSchema);

exports.schema = CommentSchema