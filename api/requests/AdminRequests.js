const { body, validationResult } = require("express-validator");

module.exports = {
    createAdmin: [
        body("name")
            .trim()
            .escape()
            .not().isEmpty().withMessage("Username is required")
            .isLength({ min: 4, max: 20 }).withMessage("Username must be between 4 and 20 characters long"),
        body("password")
            .trim()
            .escape()
            .not().isEmpty().withMessage("Password is required")
            .isLength({ min: 6 }).withMessage("Password must be at least 6 characters long"),
        body("password_confirm")
            .trim()
            .escape()
            .not().isEmpty().withMessage("Password confirmation is required")
            .custom((value, { req }) => {
                return value === req.body.password
            }).withMessage("Passwords do not match"),
    ],
    updateAdmin: [
        body("name")
            .optional()
            .trim()
            .escape()
            .isLength({ min: 4, max: 20 }).withMessage("Username must be between 4 and 20 characters long"),
        body("password")
            .optional()
            .trim()
            .escape()
            .custom((value, { req }) => {
                // Check if the password is provided and has a length of at least 6 characters
                if (value && value.length < 6) {
                    throw new Error("Password must be at least 6 characters long");
                }
                return true;
            }),
        body("password_confirm")
            .optional()
            .trim()
            .escape()
            .custom((value, { req }) => {
                return value === req.body.password
            }).withMessage("Passwords do not match"),
    ],
    loginAdmin: [
        body("name")
            .trim()
            .escape()
            .not().isEmpty().withMessage("Username is required")
            .isLength({ min: 4, max: 20 }).withMessage("Username must be between 4 and 20 characters long"),
        body("password")
            .trim()
            .escape()
            .not().isEmpty().withMessage("Password is required")
            .isLength({ min: 5 }).withMessage("Password must be at least 6 characters long"),
    ],

}