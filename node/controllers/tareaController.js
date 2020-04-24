const Tarea = require('../models/Tarea');
const Proyecto = require('../models/Proyecto');

const { validationResult } = require('express-validator')

// crear nueva tarea

exports.crearTarea = async (req, res) => {
        //errores
        const errores = validationResult(req);
        if(!errores.isEmpty()){
            return res.status(400).json({errores:errores.array()})
        }
        // extraer proyecto y verificar si existe
        const { proyecto } = req.body; 
        try {
            const existeProyecto = await Proyecto.findById(proyecto);
            if(!existeProyecto) {
                return res.status(404).json('proyecto no encontrado')
            }
            if(existeProyecto.creador.toString() !== req.usuario.id){
                return res.status(401).json({msg:'no autorizado'});
            }
            // crear nueva tarea
            const tarea = new Tarea(req.body);
            tarea.save();
            res.json({tarea});
    
        } catch (error) {
            console.log(error);
            res.status(500).send('hubo un error')
        }
}

// obtener tareas por proyecto
exports.obtenerTareas = async (req, res) => {
    const proyecto  = req.query.proyecto 
    console.log(proyecto)
    try {
        const existeProyecto = await Proyecto.findById(proyecto);
        if(!existeProyecto) {
            return res.status(404).json('proyecto no encontrado')
        }
        if(existeProyecto.creador.toString() !== req.usuario.id){
            return res.status(401).json({msg:'no autorizado'});
        }
        // obtener tareas por proyecto
        const tareas = await Tarea.find({ proyecto });
        res.json({tareas});

    } catch (error) {
        console.log(error);
        res.status(500).send('hubo un error')
    }
}

exports.actualizarTarea = async (req, res) => {
    const { proyecto, nombre, estado } = req.body; 
    try {
        // ver si la tarea existe
        let tareaExiste = await Tarea.findById(req.params.id);
        if(!tareaExiste){
            return res.status(401).json({msg:'no existe la tarea'});
        }
        // extraer proyecto
        const existeProyecto = await Proyecto.findById(proyecto);

        if(existeProyecto.creador.toString() !== req.usuario.id){
            return res.status(401).json({msg:'no autorizado'});
        }
        // crear objeto con la nueva informacion
        const nuevaTarea = {};
        if(nombre){
            nuevaTarea.nombre = nombre;
        }
        if(estado){
            nuevaTarea.estado = estado;
        }
        if(!estado){
            nuevaTarea.estado = estado;
        }
        //guardar tarea
        tareaExiste = await Tarea.findOneAndUpdate({_id: req.params.id}, nuevaTarea, {new: true});
        res.json({tareaExiste});

    } catch (error) {
        console.log(error);
        res.status(500).send('hubo un error')
    }
}

// eliminar tarea
exports.eliminarTarea = async (req, res) => {
    const { proyecto} = req.query; 
    console.log(proyecto)
    try {
        // ver si la tarea existe
        let tareaExiste = await Tarea.findById(req.params.id);
        if(!tareaExiste){
            return res.status(401).json({msg:'no existe la tarea'});
        }
        // extraer proyecto
        const existeProyecto = await Proyecto.findById(proyecto);

        if(existeProyecto.creador.toString() !== req.usuario.id){
            return res.status(401).json({msg:'no autorizado'});
        }
        // eliminar
        await Tarea.findOneAndRemove({_id: req.params.id});
        res.json({msg: 'tarea eliminada'})

    } catch (error) {
        console.log(error);
        res.status(500).send('hubo un error')
    }
}