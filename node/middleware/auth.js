const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
    // leer token header
    const token = req.header('x-auth-token');
    
    // revisar si no hay token
    if(!token){
        return res.status(401).json({msg: 'no hay token'})
    }
    // validar token
    try {
        const cifrado =  jwt.verify(token, process.env.SECRETA);
        req.usuario = cifrado.usuario;
        next();
    } catch (error) {
        res.status(401).json({msg: 'token no valido'})
    }
}