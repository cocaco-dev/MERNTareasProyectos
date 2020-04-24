import React, {useContext} from 'react';

import proyectoContext from '../../context/proyectos/proyectoContext';
import tareaContext from '../../context/tareas/tareaContext';

const Tarea = (props) => {
    // obtener el state del formulario
    const proyectosContext = useContext(proyectoContext);
    const {proyecto} = proyectosContext;
    //state tareas
    const tareasContext = useContext(tareaContext);
    const {eliminarTarea, obtenerTareas, actualizarTarea, guardarTareaActual} = tareasContext;


    // funcion eliminar tarea boton
    const tareaEliminar = idTarea => {
        console.log(idTarea)
        eliminarTarea(idTarea,proyecto[0]._id);
        obtenerTareas(proyecto[0]._id);
    } 
    // funcion modificadora estado tarea
    const cambiarEstado = tarea =>{
        if(tarea.estado){
            tarea.estado = false
        } else {
            tarea.estado = true
        }
        actualizarTarea(tarea)
    }

    // agrega tarea actual cuando el usuario quiera editarla
    const seleccionarTarea = tarea => {
        guardarTareaActual(tarea);
    }
    return (
        <li className="tarea sombra">
            <p>{props.tarea.nombre}</p>
            <div className="estado">
                {props.tarea.estado
                ?
                    (
                        <button type="button" className="completo" onClick = {() => cambiarEstado(props.tarea)}>
                            Completo
                        </button>
                    )
                :
                    (
                        <button type="button" className="incompleto" onClick= {() => cambiarEstado(props.tarea)}>
                            Incompleto
                        </button>
                    )
                }
            </div>
            <div className="acciones">
                <button type="button" className="btn btn-primario" onClick={() => seleccionarTarea(props.tarea) }>
                    Editar
                </button>
                <button type="button" className="btn btn-secundario" onClick={() => tareaEliminar(props.tarea._id) } >
                    Eliminar
                </button>
            </div>

        </li>
    );
}
 
export default Tarea;