const ArticleModel = require('../models/article');
const {validationResult} = require("express-validator");

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
    getOne: async (req, res) => {
        const number = req.query.number;
        const article = await ArticleModel.findOne({ number });
        res.send(article);
    },
    getAll: async (req, res) => {
        const articles = await ArticleModel.find();
        res.send(articles);
    },
    create: async (req, res) => {
        const validation = validationResult(req);
        if ( validation.isEmpty() ) {
            const { title, summary, content } = req.body;
            const linkUrl = !req.body.link ? '/home' : `/${req.body.link}`
            try {
                const all_articles = await ArticleModel.find({});
                const new_article_number = all_articles.length + 1
                await ArticleModel.create({ 
                    number: new_article_number, 
                    title, 
                    summary, 
                    content, 
                    link: linkUrl 
                });
                res.status(200).json('Article created');
            } catch (error) {
                console.log(error);
                res.status(400).json(error);
            }
        } else {
            const validation_err_messages = validationErrorMessages(validation.errors);
            res.status(400).json(validation_err_messages);
        }
    },

};