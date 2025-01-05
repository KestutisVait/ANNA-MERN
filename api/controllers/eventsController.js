const eventSchema = require('../models/event');

module.exports = {
    getEvents: async (req, res) => {
        try {
            const events = await eventSchema.find();
            res.status(200).json(events);
        } catch (error) {
            res.status(400).json(error);
            res.status(400).json('Something went wrong');
        }
    },
    getEvent: async (req, res) => {
        const { order_no } = req.query;
        try {
            const event = await eventSchema.findOne({ order_no });
            res.status(200).json(event);
        } catch (error) {
            res.status(400).json(error);
            res.status(400).json('Something went wrong');
        }
    },
    create: async (req, res) => {
       const { number, title, image, link, order_no } = req.body;
       console.log(req.body);

       const newEvent = await eventSchema.create({ number, title, image, link, order_no });
       res.status(200).json(newEvent);
    }
}