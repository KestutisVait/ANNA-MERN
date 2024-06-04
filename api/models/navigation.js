const mongoose = require('mongoose');

const navigationSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    link: {
        type: String,
        required: true
    },
    order_no: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model('NavItem', navigationSchema);