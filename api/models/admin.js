const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    token: {
        type: String
    },
    token_expires: {
        type: Date
    }
});

module.exports = mongoose.model('Admin', adminSchema);