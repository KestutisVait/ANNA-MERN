const SlideModel = require('../models/carousel');
const { validationResult } = require('express-validator');
var fs = require('node:fs/promises');
const path = require('path');
const mongoose = require('mongoose');

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
            const sortedSlides = slides.sort((a, b) => a.order_no - b.order_no);
            const new_slides_array = []
            for (let i = 0; i < sortedSlides.length; i++) {
                new_slides_array.push({
                    id: i+1, 
                    title: sortedSlides[i].title, 
                    description: sortedSlides[i].description, 
                    link: sortedSlides[i].link, 
                    order_no: sortedSlides[i].order_no,
                    image: sortedSlides[i].image,
                    _id: sortedSlides[i]._id
                })
            }
            res.status(200).json(new_slides_array);
            
        } catch (error) {
            res.status(400).json(error);
            res.status(400).json('Something went wrong');
        }
    },
    getSlide: async (req, res) => {
        const { order_no } = req.query;
        try {
            const slide = await SlideModel.findOne({ order_no });
            res.status(200).json(slide);
        } catch (error) {
            res.status(400).json(error);
            res.status(400).json('Something went wrong');
        }
    },
    create: async (req, res) => {
        const validation = validationResult(req);
        
        if (validation.isEmpty()) {
            const { title, description, link, order_no } = req.body;
            console.log(req.body);
            const imageUrl = req.file ? `images/${req.file.originalname}`: null
            try {
                if (req.file) {
                    const ext = {"image/webp": ".webp", "image/png": ".png", "image/jpeg": ".jpg"};
                    await fs.rename(req.file.path, "public/images/" + req.file.originalname);
                } 
                const newSlide = await SlideModel.create({ title, image: imageUrl, description, link, order_no });
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
    update: async (req, res) => {
        const validation = validationResult(req);
        if (validation.isEmpty()) {
            const { title, description, link, order_no, image } = req.body;
            const imageUrl = req.file ? `images/${req.file.originalname}` :  image ? image : null
            console.log(req.body);
            console.log(req.file);
            console.log(imageUrl);
            try {
                if (req.file) {
                    const ext = {"image/webp": ".webp", "image/png": ".png", "image/jpeg": ".jpg"};
                    await fs.rename(req.file.path, "public/images/" + req.file.originalname);
                } 
                const newSlide = await SlideModel.updateOne({ order_no }, { title, image: imageUrl, description, link, order_no });
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
    },
    reorder: async (req, res) => {
        const slides_array = req.body;
        
        try {
            for (let slide of slides_array) {
                await SlideModel.updateOne({ _id: slide._id }, {order_no: slide.order_no });
            };
        } catch (error) {
            console.log(error);
        }
    }
}