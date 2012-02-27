/** Comment model.
 * Note : this schema is just use to separate a different model, but could be merged with
 * hill.js. We never call newComment.save() and the collection is never created in mongodb.
 * However, we are sure that all comments about hill follow the following "schema".
 *@author	Jeremy Gabriele
*/

var mongoose     = require('mongoose'),
    Schema       = mongoose.Schema;

// Comment schema.
var CommentSchema = new Schema({
  content: String,
  mark: {type: Number, min: 0, max: 4},
  author: {type: String},
  creationDate: {type: Date, default: Date.now},
  tags: [String]
});

mongoose.model('Comment', CommentSchema);

exports.schema = CommentSchema