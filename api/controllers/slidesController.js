const SlideModel = require('../models/carousel');
const { validationResult } = require('express-validator');
var fs = require('node:fs/promises');
const path = require('path');


function validationErrorMessages(errors) {
    const validation_err_messages = {}
    const validation_messages = errors;
    for (let msg of validation_messages) {
        const key = msg.path;
        const value = msg.msg;
        if (!validation_err_messages[key]) {
            validation_err_messages[key] = [value]
        } else {
            validation_err_messages[key].push(value)
        }
    }
    return validation_err_messages
}


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
            const { title, description, link, order_no } = req.body;
            const linkUrl = `/${link}`;
            console.log(req.body);
            const imageUrl = req.file ? `images/${req.file.originalname}`: null
            try {
                if (req.file) {
                    const ext = {"image/webp": ".webp", "image/png": ".png", "image/jpeg": ".jpg"};
                    await fs.rename(req.file.path, "public/images/" + req.file.originalname);
                } 
                const newSlide = await SlideModel.create({ title, image: imageUrl, description, link: linkUrl, order_no });
                res.status(200).json(newSlide);
            } catch (error) {
                res.status(400).json(error);
                console.log(error);
            }
        } else {
            const validation_err_messages = validationErrorMessages(validation.errors);
            res.status(400).json(validation_err_messages);
        }
    },
    delete: async (req, res) => {
        const { _id, image } = req.body;
        try {
            await SlideModel.deleteOne({ _id });
            fs.unlink(path.join(__dirname, '..',  'public', image));
            res.json({ message: 'Slide deleted' });

        } catch (error) {
            res.json({ message: error });
        }
    }
}