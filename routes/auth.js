/*
    Rutas de Usuarios / Auth
    host + /auth
*/

const express = require('express');
const { check } = require('express-validator');
const { validateFields } = require('../middlewares/validateFields');

const { newUser, login, reviveToken } = require('../controllers/auth');
const { validateJWT } = require('../middlewares/validateJWT');

const router = express.Router();


router.post(
    '/newUser',
    [
        check('name', 'El nombre es Obligatorio').not().isEmpty(),
        check('email', 'El correo es Obligatorio').not().isEmpty(),
        check('password', 'La contraseña es Obligatoria').not().isEmpty(),
        check('profile_name', 'El rol del usuario es Obligatorio').not().isEmpty(),
        validateFields
    ],
    newUser
);

router.post(
    '/login',
    [
        check('email', 'El correo es Obligatorio').not().isEmpty(),
        check('password', 'La contraseña es Obligatoria').not().isEmpty(),
        validateFields
    ],
    login
);

router.get('/reviveToken', validateJWT, reviveToken);


module.exports = router;