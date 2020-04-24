import React, {useContext, useEffect} from 'react';

import Proyecto from './Proyecto';

import ProyectoContext from '../../context/proyectos/proyectoContext';
import AlertaContext from '../../context/alertas/alertaContext';

const ListadoProyectos = () => {
    //extraer valores del context
    const alertaContext = useContext(AlertaContext);
    const {alerta, mostrarAlerta} = alertaContext;
    //extraer proyectos de proyecto state
    const proyectosContext = useContext(ProyectoContext);
    const {mensaje, proyectos, obtenerProyectos} = proyectosContext;


    useEffect(() =>{
        // si hay error
        if(mensaje){
            mostrarAlerta(alerta.msg, alerta.categoria)
        }
        console.log('entrooo')
        obtenerProyectos();
        // eslint-disable-next-line
    },[]);
    // revisar si proyectos tiene contenido
    
    if(proyectos.length === 0) {
        
        return <p>No hay Proyectos</p>
    }

 
    return ( 
        <ul className="listado-proyectos">
            {alerta ?  (<div className={`alerta ${alerta.categoria}`}>{alerta.msg}</div>): null}
            {proyectos.map(proyecto => (
                <Proyecto key={proyecto._id} proyecto={proyecto} />
            ))}
        </ul>
     );
}
 
export default ListadoProyectos;