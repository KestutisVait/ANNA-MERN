const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
    number: {
        type: Number,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    image: {
        type: String,
        // required: true
    },
    link: {
        type: String,
        required: true
    },
    order_no: {
        type: Number,
        // required: true
    },
});

module.exports = mongoose.model('Event', eventSchema);