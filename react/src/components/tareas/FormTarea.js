import React, {useContext, useState, useEffect} from 'react';
import proyectoContext from '../../context/proyectos/proyectoContext';
import tareaContext from '../../context/tareas/tareaContext';
const FormTarea = () => {
     // obtener el state del formulario
     const proyectosContext = useContext(proyectoContext);
     const {proyecto} = proyectosContext;

    //state tareas
    const tareasContext = useContext(tareaContext);
    const {errorTarea, tareaSeleccionada, agregarTarea, validarTarea, obtenerTareas, actualizarTarea} = tareasContext;

    //state del componente
    const [tarea, setTarea]= useState({nombre:''});
    const {nombre} = tarea;
    //efecto para editar tarea seleccionada
    useEffect(() =>{
        if(tareaSeleccionada !== null){
            setTarea(tareaSeleccionada)
        }else{
            setTarea({
                nombre: ""
            })
        }

    },[tareaSeleccionada])

    if(!proyecto) return null;
    //const [proyectoActual] = proyecto;
    
    // leer valores formulario
    const handleChange = e => {
        setTarea({
            ...tarea,
            [e.target.name]: e.target.value
            
        })
    }
    const onSubmit = e => {
        e.preventDefault();
        //validar
        if(nombre.trim() === ''){
            validarTarea();
            return;
        }
        if(tareaSeleccionada === null){
            // tarea nueva
            //pasar validacion
            tarea.proyecto = proyecto[0]._id;
            agregarTarea(tarea);
        }else{
            actualizarTarea(tarea)
        }

        // obtener y filtrar las tareasdel proyecto
        obtenerTareas(proyecto[0].id)
        // reinciar form
        setTarea({
            nombre: ''
        })
    }

    return ( 
        <div className="formulario">
            <form onSubmit={onSubmit} >
               <div className="contenedor-input">
                    <input 
                        type="text"
                        className="input-text"
                        placeholder="Nombre Tarea"
                        name="nombre"
                        value={nombre}
                        onChange={handleChange}
                    />   
                </div> 

                <div className="contenedor-input">
                    <input 
                        type="submit"
                        className="btn btn-primario btn-submit btn-block"
                        value={tareaSeleccionada ? 'Editar Tarea' : 'Agregar Tarea'}
                    />   
                </div> 

            </form>
            {errorTarea ? <p className="mensaje error">el nombre de la tarea es obigatorio</p>: null}
        </div>
     );
}
 
export default FormTarea;