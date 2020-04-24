import React, {useContext}from 'react';
import proyectoContext from '../../context/proyectos/proyectoContext';
import tareaContext from '../../context/tareas/tareaContext';



const Proyecto = (props) => {
    const tareasContext = useContext(tareaContext);
    const {obtenerTareas} = tareasContext;
    // obtener el state del formulario
    const proyectosContext = useContext(proyectoContext);
    const {proyectoActual} = proyectosContext;
    //seleccionar proyecto actual
    const onClickProyectoActual = id => {
        proyectoActual(id);
        obtenerTareas(id)
    }
    return ( 
       <li>
           <button type="button" className="btn btn-blank" onClick={()=> onClickProyectoActual(props.proyecto._id) }>
               {props.proyecto.nombre}
           </button>
       </li> 
     );
}
 
export default Proyecto;