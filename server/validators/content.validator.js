const { body, validationResult } = require('express-validator');

exports.validationBodyRules = [
    body('email').exists().withMessage('email é obrigatório').bail().trim().notEmpty().withMessage('email não pode ser vazio').bail().isEmail().withMessage('email deve ser um email válido').bail(),
    body('subject').exists().withMessage('assunto é obrigatório').bail().trim().notEmpty().withMessage('assunto é obrigatório').bail().isLength({ max: 32 }).withMessage('assunto possui um tamanho máximo de 32 caracteres').bail(),
    body('message').exists().withMessage('mensagem é obrigatório').bail().trim().notEmpty().withMessage('mensagem é obrigatório').bail().isLength({ max: 1000 }).withMessage('mensagem possui um tamanho máximo de 1000 caracteres').bail()
];

exports.checkRules = (req, res, next) => {
    const result = validationResult(req);
    if (!result.isEmpty()) {
        const errors = result.array().map((error) => ({
            field: error.path,
            message: error.msg
        }));
        return res.status(400).json({ errors });
    }
    next();
};
