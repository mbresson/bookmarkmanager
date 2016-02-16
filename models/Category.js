
var mongoose = require('mongoose');

var CategorySchema = new mongoose.Schema({
    name: String,
    bookmarks: [{
        name: String,
        url: String,
    }],
});

module.exports = mongoose.model('Category', CategorySchema);

