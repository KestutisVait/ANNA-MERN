const SlideModel = require('../models/carousel');
const { validationResult } = require('express-validator');

module.exports = {
    getSlides: async (req, res) => {
        try {
            const slides = await SlideModel.find();
            res.status(200).json(slides);
            
        } catch (error) {
            res.status(400).json(error);
            res.status(400).json('Something went wrong');
        }
    },

    create: async (req, res) => {
        const validation = validationResult(req);
        
        if (validation.isEmpty()) {
            const { title, image, description, link, order_no } = req.body;
            try {
                const newSlide = await SlideModel.create({ title, image, description, link, order_no });
                res.status(200).json(newSlide);
            } catch (error) {
                res.status(400).json(error);
            }
        } else {
            const validation_err_messages = validationErrorMessages(validation.errors);
            res.status(400).json(validation_err_messages);
        }
    }
}