const { body, validationResult } = require("express-validator");

module.exports = {
    createArticle: [
        body("title")
            .trim()
            .escape()
            .not().isEmpty().withMessage("Title is required")
            .isLength({ max: 50 }).withMessage("Description must be at most 50 characters long"),
        body("summary")
            .trim()
            .escape()
            .not().isEmpty().withMessage("Description is required")
            .isLength({ max: 200 }).withMessage("Description must be at most 200 characters long"),
        body("content")
            .trim()
            .escape()
            .not().isEmpty().withMessage("Link is required"),
        body("link")
            .trim()
            .escape()
            .isLength({ max: 10 }).withMessage("Link must be at most 10 characters long"),
    ]
}