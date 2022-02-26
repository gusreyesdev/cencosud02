const { response } = require('express');
const { validationResult } = require('express-validator');


const validateFields = (req, res = response, next) => {

    const validate = validationResult(req);

    if (!validate.isEmpty()) {

        return res.status(400).json({
            ok: false,
            errors: validate.mapped()
        })

    }

    next();

}


module.exports = {
    validateFields
}