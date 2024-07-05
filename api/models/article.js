const mongoose = require('mongoose');

const articleSchema = new mongoose.Schema({
    number: {
        type: Number,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    summary: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    link: {
        type: String
    },
});

module.exports = mongoose.model('Article', articleSchema);