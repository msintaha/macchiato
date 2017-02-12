var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;
mongoose.Promise = global.Promise;

var PostSchema   = new Schema({
    title: String,
    body: String,
    createdAt: { type: Date, default: Date.now },
    author: String,
    published: { type: Boolean, default: false },
    meta: {
    votes: Number
  }
});

module.exports = mongoose.model('Post', PostSchema);
