const AdminModel = require('../models/admin');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {validationResult} = require("express-validator");
require('dotenv').config();

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
    getAdmins: async (req, res) => {
        try {
            const admins = await AdminModel.find();
            res.json(admins);
        } catch (error) {
            res.json({ message: error });
        }
    },
    getAdmin: async (req, res) => {
        const { name } = req.query;
        try {
            const admin = await AdminModel.findOne({ name });
            res.json(admin);
        } catch (error) {
            res.json({ message: error });
        }
    },
    create: async (req, res) => {
        const validation = validationResult(req);
        
        if (validation.isEmpty()) {
            const { name, password, password_confirm } = req.body;
            const hashedPassword = await bcryptjs.hash(password, 10);
            try {
                const admin_in_db = await AdminModel.findOne({ name });
                if (!admin_in_db) {
                    const newAdmin = await AdminModel.create({ name, password: hashedPassword })
                    res.json(newAdmin);
                    } else {
                        res.status(400).json({name: ['Admin with this username already exists'] });
                        }
            } catch (error) {
                res.json({ message: error });
                }
        } else {
            const validation_err_messages = validationErrorMessages(validation.errors);
            res.status(400).json(validation_err_messages);
        }

    },
    update: async (req, res) => {
        const validation = validationResult(req);
        
        if (validation.isEmpty()) {
            const { id, password_confirm } = req.body;
            const {password} = req.body ?? null;
            const hashedPassword = await bcryptjs.hash(password, 10);
            try {
                    const admin_in_db = await AdminModel.findOne({ _id: id });
                    const {name} = req.body ?? admin_in_db.name;
                    password ?
                        await AdminModel.updateOne({_id: id},{ $set: {name, password: hashedPassword}}) :
                        await AdminModel.updateOne({_id: id},{ $set: {name}})
                    res.json('Admin updated successfully');
            } catch (error) {
                res.json({ message: error });
                }
        } else {
            const validation_err_messages = validationErrorMessages(validation.errors);
            res.status(400).json(validation_err_messages);
        }

    },
    delete: async (req, res) => {
        const { name } = req.body;
        try {
            await AdminModel.deleteOne({ name });
            res.json({ message: 'Admin deleted' });
        } catch (error) {
            res.json({ message: error });
        }
    },
    login: async (req, res) => {
        const validation = validationResult(req);
        
        if (validation.isEmpty()) {
            const { name, password } = req.body;
            try {
                const admin_in_db = await AdminModel.findOne({ name });
                if (!admin_in_db) {
                    res.status(400).json({ name: ['Admin with this username does not exists'] });
                } else {
                    if (await bcryptjs.compare(password, admin_in_db.password)) {
                        const token_body = {name};
                        const token = jwt.sign(token_body, process.env.JWT_SECRET_KEY);
                        const token_expires = new Date(Date.now() + 24 * 60 * 60 * 1000);
                        await AdminModel.updateOne({ name }, { $set: {token: token, token_expires: token_expires} });
                        res.status(200).json({ token: token, name: name });
                    } else {
                        res.json({ password: ['Wrong password'] });
                    }
                }
            } catch (error) {
                res.json({ message: error , login: false});
            }
        } else {
            const validation_err_messages = validationErrorMessages(validation.errors);
            res.status(400).json(validation_err_messages);
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