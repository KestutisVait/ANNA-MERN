const NavModel = require('../models/navigation');

module.exports = {

    getNavItems: async (req, res) => {
        try {
            const navs = await NavModel.aggregate([
                { $sort: { order_no: 1 } },
                { $project: { title: 1, link: 1} }
            ]);
            res.json(navs);
        } catch (error) {
            res.json({ message: error });
        }
    },
    getNavItem: async (req, res) => {
        const { title } = req.body;
        try {
            const nav_item = await NavModel.findOne({ title });
            res.json(nav_item);
        } catch (error) {
            res.json({ message: error });
        }
    },
    create: async (req, res) => {
        const { title, link, order_no } = req.body;

        try {
            const nav_item_db = await AdminModel.findOne({ title });
            if (!nav_item_db) {
                const newNavItem = await NavModel.create({ title, link, order_no });
                res.json(newNavItem);
            } else {
                res.json({ message: 'Nav item already exists' });
            }
        } catch (error) {
            res.json({ message: error });
        }
    },
    delete: async (req, res) => {
        const { title } = req.body;
        try {
            await NavModel.deleteOne({ title });
            res.json({ message: 'Nav item deleted' });
        } catch (error) {
            res.json({ message: error });
        }
    },
    update: async (req, res) => {
        const { title, link, order_no } = req.body;
        try {
            await NavModel.updateOne({ title }, { title, link, order_no });
            res.json({ message: 'Nav item updated' });
        } catch (error) {
            res.json({ message: error });
        }
    }
};