import React, {Fragment, useState, useContext} from 'react';

import proyectoContext from '../../context/proyectos/proyectoContext';

const NuevoProyecto = () => {

    // obtener el state del formulario
    const proyectosContext = useContext(proyectoContext);
    const {formulario, errorFormulario, mostrarFormulario, agregarProyecto, mostrarError} = proyectosContext;

    const [proyecto, setProyecto] = useState({
        nombre:''
    });
    
    const {nombre} = proyecto;

    const onChangeProyecto = e => {
        setProyecto({
            ...proyecto,
            [e.target.name]: e.target.value
        })
    }

    const onSubmitProyecto = e => {
        e.preventDefault();
        //validar proyecto
        if(nombre=== '') {
            mostrarError();    
            return;
        }
        //agregar state
        agregarProyecto(proyecto);
        //reiniciar form
        setProyecto({
            nombre:''
        })
    }


    // mostrar formulario
    const onClickFormulario = () =>{
       mostrarFormulario();
    }

    return (  
        <Fragment>
            <button
                type="button"
                className="btn btn-block btn-primario"
                onClick={onClickFormulario}
            >Nuevo Proyecto</button>
            {formulario 
                ? 
                    (
                        <form onSubmit={onSubmitProyecto} className="formulario-nuevo-proyecto">
                            <input 
                                type="text"
                                className="input-text"
                                placeholder="Nombre Proyecto"
                                name="nombre"
                                onChange={onChangeProyecto}
                                value={nombre}
                            />
                            <input 
                                type="submit"
                                className="btn btn-primario btn-block"
                                value="Agregar Proyecto"

                            />
                        </form>
                    )
                : null
            }
            {errorFormulario ? <p className="mensaje error">Nombre del proyecto es obligatorio</p>: null}
        </Fragment>
    );
}


 
export default NuevoProyecto;