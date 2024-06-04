const NavModel = require('../models/navigation');

module.exports = {

    getNavItems: async (req, res) => {
        try {
            const navs = await NavModel.aggregate([
                { $sort: { order_no: 1 } },
                { $project: { title: 1, link: 1} }
            ]);
            console.log(navs);
            res.json(navs);
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

    }
};