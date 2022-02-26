const { response } = require('express');
const jwt = require('jsonwebtoken');


const validateJWT = (req, res = response, next) => {

    const token = req.header('x-token');

    if (!token) {
        return res.status(401).json({
            ok: false,
            msg: 'No hay token en la peticion'
        });
    }

    try {

        const {id, name } = jwt.verify(
            token, 
            process.env.JWT_SECRET_KEY
        );

        req.id   = id;
        req.name = name;  

        
    } catch (error) {
        console.log("error ", error);

        return res.status(401).json({
            ok: false,
            msg: 'Token no valido'
        });
        
    }

    next();
}


module.exports = {
    validateJWT
}