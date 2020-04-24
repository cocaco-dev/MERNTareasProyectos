const express = require('express');
const router = express.Router();

const proyectoController = require('../controllers/proyectoController');
const auth = require('../middleware/auth');
const { check } = require('express-validator')

// /api/proyectos
router.post('/', auth, 
    [
        check('nombre','el nombre es obligatorio').not().isEmpty()
    ]
    ,proyectoController.crearProyecto);

router.get('/', auth, proyectoController.obtenerProyectos);


router.put('/:id', auth, proyectoController.actualizarProyecto)

router.delete('/:id', auth, proyectoController.eliminarProyecto)

module.exports = router;