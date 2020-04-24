const Usuario = require('../models/Usuario')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {validationResult} = require('express-validator');

exports.autenticarUsuario = async (req,res) => {
    // revisar si hay errores middleware
    const errores = validationResult(req);
    if(!errores.isEmpty()){
        return res.status(400).json({errores:errores.array()})
    }
    const{email, password} = req.body;
    try {
        let usuario = await Usuario.findOne({email});
        if(!usuario){
            return res.status(400).json({msg:'Usuario no existe'});
        }
        const passCorrecto = await bcrypt.compare(password, usuario.password);
        if(!passCorrecto){
            return res.status(400).json({msg: 'pass incorrecto'})
        }
        //crear y firmar JWT
        const  payload = {
            usuario: {
                id: usuario.id
            }
        }
        // firmar JWT
        jwt.sign(payload,process.env.SECRETA, {
            expiresIn: 3600 // 1 hora
        }, (error, token) =>{
            if(error) throw error;
            res.json({token})
        });
    } catch (error) {
        console.log(error);
    }
}

// obtiene usuario autenticado

exports.usuarioAutenticado = async (req, res) => {
    try {
        const usuario =  await Usuario.findById(req.usuario.id).select('-password')
        res.json({usuario})
    } catch (error) {
        res.status(401).json({msg: 'token no valid'})
    }
}