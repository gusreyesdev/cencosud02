const { response } = require('express');
const Profile = require('../models/Profile');



const getProfiles = async (req, res = response) => {

    res.json({
        ok: true,
        msg: 'getProfiles'
    });
};

const createProfiles = async (req, res = response) => {

    const { name } = req.body;

    try {

        let profile = await Profile.findOne({ name });

        if (profile) {
            return res.status(400).json({
                ok: false,
                msg: 'El perfil ya existe'
            });
        }

        profile = new Profile(req.body);

        await profile.save();

        res.status(201).json({
            ok: true,
            name: profile.name,
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
    getProfiles,
    createProfiles
}