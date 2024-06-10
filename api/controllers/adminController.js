const AdminModel = require('../models/admin');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');

require('dotenv').config();

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

    },
    login: async (req, res) => {
        const { name, password } = req.body;
        try {
            const admin_in_db = await AdminModel.findOne({ name });
            if (!admin_in_db) {
                res.json({ login: false, target: 'username', message: 'Admin with this username does not exists' });
            } else {
                if (await bcryptjs.compare(password, admin_in_db.password)) {
                    const token_body = {name};
                    const token = jwt.sign(token_body, process.env.JWT_SECRET_KEY);
                    const token_expires = new Date(Date.now() + 24 * 60 * 60 * 1000);
                    await AdminModel.updateOne({ name }, { $set: {token: token, token_expires: token_expires} });
                    res.json({ login: true, token: token, message: 'Admin logged in' });
                } else {
                    res.json({ login: false, target: 'password', message: 'Wrong password' });
                }
            }
        } catch (error) {
            res.json({ message: error , login: false});
        }
    },
    logout: async (req, res) => {
        const { token } = req.body;
        try {
            const admin_in_db = await AdminModel.findOne({ token });
            const name = admin_in_db.name;
            await AdminModel.updateOne({ name }, { $set: {token: null, token_expires: null} });
            console.log('Admin logged out');
            res.status(200).json({message: 'Admin logged out'});
        } catch (error) {
            res.json({ message: error });
        }
    }
};