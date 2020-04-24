const Proyecto = require('../models/Proyecto')
const { validationResult } = require('express-validator')

exports.crearProyecto = async (req, res) => {
    //errores
    const errores = validationResult(req);
    if(!errores.isEmpty()){
        return res.status(400).json({errores:errores.array()})
    }
    try {
        // crear nuevo proyecto
        const proyecto = await new Proyecto(req.body);
        // guardar creador proyecto
        proyecto.creador = req.usuario.id;
        proyecto.save();
        res.json(proyecto);

    } catch (error) {
        console.log(error);
        res.status(500).send('hubo un error')
    }
}

exports.obtenerProyectos = async (req, res) => {
    try {
        const proyectos = await Proyecto.find({creador:req.usuario.id})
        res.json({proyectos})
    } catch (error) {
        console.log(error);
        res.status(500).send({msg:'hubo un error'})
    }
}

exports.actualizarProyecto = async (req, res) => {

    // extraer info del proyecto
    const { nombre} = req.body;
    const nuevoProyecto = {};

    if(nombre){
        nuevoProyecto.nombre = nombre
    }
    try {
        proyecto = await Proyecto.findById(req.params.id);
        if(!proyecto){
            return res.status(404).json({msg:'proyecto no encontrado'})
        }
        if(proyecto.creador.toString() !== req.usuario.id){
            return res.status(401).json({msg:'no autorizado'});
        }
        // actualizar
        proyecto = await findByIdAndUpdate({_id: req.params.id }, {$set: nuevoProyecto}, {new: true});
        res.json({proyecto})
    } catch (error) {
        console.log(error);
        res.status(500).send({msg:'hubo un error'})
    }
}

exports.eliminarProyecto = async (req, res) => {
    try {
        proyecto = await Proyecto.findById(req.params.id);
        if(!proyecto){
            return res.status(404).json({msg:'proyecto no encontrado'})
        }
        if(proyecto.creador.toString() !== req.usuario.id){
            return res.status(401).json({msg:'no autorizado'});
        }
        // eliminar
        await Proyecto.findOneAndRemove({_id:req.params.id})
        res.json({msg:'proyecto eliminado'})
    } catch (error) {
        console.log(error);
        res.status(500).send({msg:'hubo un error'})
    }
}