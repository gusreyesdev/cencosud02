const { response } = require('express');
const User = require('../models/User');
const Profile = require('../models/Profile');



const getStudents = async (req, res = response) => {

    try {

        let profile = await Profile.findOne({ name: 'Estudiante' });

        const students = await User.find({ profile: profile._id }).populate('profile', 'name');

        res.status(200).json({
            ok: true,
            students
        });

    } catch (error) {

        console.log("error getStudents ", error);

        res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador'
        });

    }

}


module.exports = {
    getStudents
}