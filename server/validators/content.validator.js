const { body, validationResult } = require('express-validator');

exports.validationBodyRules = [
    body('email', 'email is required').exists(),
    body('title', 'title is required').exists(),
    body('message', 'message is required').exists(),
    body('email', 'email is required').notEmpty(),
    body('email', 'email is required').isEmail(),
    body('title', 'title is required').notEmpty().isLenght({ max: 32 }),
    body('message', 'message is required').notEmpty(),
    body('message', 'message is required').isLenght({ max: 1000 })
];

exports.checkRules = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};