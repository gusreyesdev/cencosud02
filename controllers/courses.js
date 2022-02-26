const { response } = require('express');
const Course = require('../models/Course');



const getCourses = async (req, res = response) => {

    try {

        const courses = await Course.find().populate('students.student', 'name');

        res.status(200).json({
            ok: true,
            courses
        });

    } catch (error) {

        console.log("error ", error);

        res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador'
        });

    }
};

const createCourses = async (req, res = response) => {

    const { students } = req.body;

    try {

        const course = new Course(req.body);

        course.students = students;

        const courseSaved = await course.save();

        res.status(201).json({
            ok: true,
            course: courseSaved
        });


    } catch (error) {
        console.log("error ", error);

        res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador'
        });
    }
};

const updateCourses = async (req, res = response) => {

    const { id } = req.params;

    const { students } = req.body;

    try {

        const course = await Course.findById(id);

        if (!course) {
            return res.status(404).json({
                ok: false,
                msg: 'El curso no existe'
            });
        }

        const courseUpdate = await Course.findByIdAndUpdate(id,
            {$set: {"students.$[el].note":students[0].note}},
            {   
                arrayFilters: [{"el.student": students[0].student }],
                new: true 
            }
        );

        res.status(200).json({
            ok: true,
            msg: "Nota actualizada"
        });


    } catch (error) {

        console.log("error ", error);

        res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador'
        });

    }
};

const deleteCourses = async (req, res = response) => {

    const { id } = req.params;

    try {

        const course = await Course.findById(id);

        if (!course) {
            return res.status(404).json({
                ok: false,
                msg: 'El curso no existe'
            });
        }

        await Course.findByIdAndDelete(id);

        res.status(200).json({
            ok: true,
            msg: "Curso Eliminado"
        });
        
        
    } catch (error) {

        console.log("error ", error);

        res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador'
        });
        
    }

};


module.exports = {
    getCourses,
    createCourses,
    updateCourses,
    deleteCourses
}