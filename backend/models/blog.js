const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
    title: String,
    author: String,
    content: String,
    date: {
        type: Date,
        default: Date.now
    },
})

const Blog = mongoose.model('Blog', blogSchema);
module.exports = Blog;