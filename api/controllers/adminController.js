const AdminModel = require('../models/admin');
const bcryptjs = require('bcryptjs');

module.exports = {
    create: async (req, res) => {
        const { name, password } = req.body;
        const hashedPassword = await bcryptjs.hash(password, 10);

        try {
            const admin_in_db = await AdminModel.findOne({ name });
            if (!admin_in_db) {
                const newAdmin = await AdminModel.create({ name, password: hashedPassword })
                res.json(newAdmin);
            } else {
                res.json({ message: 'Admin with this username already exists' });
            }
        } catch (error) {
            res.json({ message: error });
        }

    }
};