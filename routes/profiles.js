/*
    Rutas de Perfiles
    host + /courses
*/

const express = require('express');
const { check } = require('express-validator');
const { validateFields } = require('../middlewares/validateFields');

const { validateJWT } = require('../middlewares/validateJWT');
const { getProfiles, createProfiles } = require('../controllers/profiles');

const router = express.Router();
router.use(validateJWT);


router.get('/getProfiles', getProfiles);

router.post(
    '/createProfiles',
    [
        check('name', 'El nombre es Obligatorio').not().isEmpty(),
        validateFields
    ],
    createProfiles
);

module.exports = router;