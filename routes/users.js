/*
    Rutas de Usuario
    host + /users
*/

const express = require('express');
const { check } = require('express-validator');
const { validateFields } = require('../middlewares/validateFields');

const { validateJWT } = require('../middlewares/validateJWT');
const { getStudents } = require('../controllers/user');

const router = express.Router();
router.use(validateJWT);


router.get('/getStudents', getStudents);



module.exports = router;