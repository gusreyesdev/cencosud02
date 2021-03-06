/*
    Rutas de Cursos
    host + /courses
*/

const express = require('express');
const { check } = require('express-validator');
const { validateFields } = require('../middlewares/validateFields');

const { validateJWT } = require('../middlewares/validateJWT');
const { getCourseByTeacher, getCourseByStudent, getCourseById, createCourses, updateCourses, deleteCourses } = require('../controllers/courses');

const router = express.Router();
router.use(validateJWT);


router.get('/getCourseByTeacher', getCourseByTeacher);

router.get('/getCourseByStudent', getCourseByStudent);

router.get('/getCourseById/:id', getCourseById);

router.post(
    '/createCourses',
    [
        check('name', 'El nombre es Obligatorio').not().isEmpty(),
        check('students', 'Los estudiantes son Obligatorios').not().isEmpty(),
        validateFields
    ],
    createCourses
);

router.put(
    '/updateCourses/:id',
    [
        check('name', 'El nombre es Obligatorio').not().isEmpty(),
        check('students.*.student', 'El estudiante es Obligatorios').not().isEmpty(),
        check('students.*.grade', 'La calificacion es Obligatoria').not().isEmpty(),
        validateFields
    ],
    updateCourses
);

router.delete(
    '/deleteCourses/:id',
    [

    ],
    deleteCourses
);


module.exports = router;