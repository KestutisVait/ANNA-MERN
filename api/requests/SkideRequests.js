const { body, validationResult } = require("express-validator");

module.exports = {
    createSlide: [
        body("title")
            .trim()
            .escape()
            .not().isEmpty().withMessage("Title is required"),
        body("description")
            .trim()
            .escape()
            .not().isEmpty().withMessage("Description is required")
            .isLength({ max: 200 }).withMessage("Description must be at most 200 characters long"),
    ]

}