const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postSchema = new Schema({
    message: String,
    userId: String
});

module.exports = mongoose.model('Post', postSchema);
