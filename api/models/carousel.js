const mongoose = require('mongoose');

const slideSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    link: {
        type: String,
        // required: true
    },
    order_no: {
        type: Number,
        // required: true
    },
});

module.exports = mongoose.model('Slide', slideSchema);