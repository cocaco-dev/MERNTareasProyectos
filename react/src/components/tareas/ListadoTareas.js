import React, {Fragment, useContext} from 'react';
import proyectoContext from '../../context/proyectos/proyectoContext';
import tareaContext from '../../context/tareas/tareaContext';

import Tarea from './Tarea';

const ListadoTareas = () => {
    const tareasContext = useContext(tareaContext);
    const {tareasProyecto} = tareasContext;
    // obtener el state del formulario
    const proyectosContext = useContext(proyectoContext);
    const {proyecto,eliminarProyecto} = proyectosContext;

    if(!proyecto) return <h2>Selecciona un proyecto</h2>
    // array destructuring proyectoActual(pos 0)
    const [proyectoActual] = proyecto;

    //eliminar proyecto
    const OnClickEliminarProyecto = () => {
        eliminarProyecto(proyectoActual._id);
    }
    return (
        <Fragment>
            <h2>proyecto: {proyectoActual.nombre} </h2>
            <ul className="listado-tareas">
                {tareasProyecto.length === 0
                    ? (<li className="tarea">No hay tareas</li>)
                    : tareasProyecto.map(tarea =>(
                        <Tarea
                            key={tarea.id} 
                            tarea={tarea}
                        />
                    ))
                }
            </ul>
            <button type="button" className="btn btn-eliminar" onClick={OnClickEliminarProyecto} >
                Eliminar proyecto &times;
            </button>
        </Fragment>
     );
}
 
export default ListadoTareas;