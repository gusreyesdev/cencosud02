const { response } = require('express');
const bcrypt = require('bcryptjs');
const { generateJWT } = require('../helpers/jwt');
const User = require('../models/User');
const Profile = require('../models/Profile');


const newUser = async (req, res = response) => {

    const { name, email, password, profile_name } = req.body;

    try {

        let user = await User.findOne({ email });

        let profile = await Profile.findOne({ name: profile_name });

        if (user) {
            return res.status(400).json({
                ok: false,
                msg: 'Un usuario existe con ese correo'
            });
        }

        if (!profile) {
            return res.status(404).json({
                ok: false,
                msg: 'El rol del usuario no existe'
            });
        }

        user = new User(req.body);

        /*Encriptar la contraseña */
        const salt = bcrypt.genSaltSync();
        user.password = bcrypt.hashSync(password, salt);
        
        user.profile = profile

        await user.save();

        /** Generar token */
        const token = await generateJWT(user.id, user.name);

        res.status(201).json({
            ok: true,
            id: user.id,
            name: user.name,
            token
        });

    } catch (error) {
        console.log("error ", error);

        res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador'
        });
    }

};


const login = async (req, res = response) => {

    const { email, password } = req.body;

    try {

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({
                ok: false,
                msg: 'Correo o Contraseña no son correctos'
            });
        }


        const validPassword = bcrypt.compareSync(password, user.password);

        if (!validPassword) {
            return res.status(400).json({
                ok: false,
                msg: 'Contraseña incorrecta'
            });
        }

        /** Generar token */
        const token = await generateJWT(user.id, user.name);

        res.status(200).json({
            ok: true,
            id: user.id,
            name: user.name,
            token
        });

    } catch (error) {
        console.log("error ", error);

        res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador'
        });

    }

}

const reviveToken = async (req, res = response) => {

    const { id, name } = req;

    const token = await generateJWT(id, name);

    res.json({
        ok: true,
        id,
        name,
        token
    });

}




module.exports = {
    newUser,
    login,
    reviveToken
}