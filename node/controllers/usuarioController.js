const Usuario = require('../models/Usuario')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')
exports.crearUsuario = async (req, res) => {
    // extraer mail y pass para validar
    const {email, password} = req.body;
    try {
        //
        let usuario = await Usuario.findOne({email:email});
        if(usuario){
            return res.status(400).json({msg: 'el usuario ya existe'});
        }
        // crear nuevo usuario
        usuario = new Usuario(req.body);
        // hash passowrd
        const salt = await bcrypt.genSalt(10);
        usuario.password = await bcrypt.hash(password, salt);
        //guardar usuario
        await usuario.save();
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
        res.status(400).send('hubo un error');
    }
}