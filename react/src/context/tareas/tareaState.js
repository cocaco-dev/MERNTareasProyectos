import React, {useReducer} from 'react';

import tareaReducer from './tareaReducer';
import tareaContext from './tareaContext';

import clientAxios from '../../config/axios';

import {
    TAREAS_PROYECTO,
    AGREGAR_TAREA,
    VALIDAR_TAREA,
    ELIMINAR_TAREA,
    ESTADO_TAREA,
    TAREA_ACTUAL,
    ACTUALIZAR_TAREA
} from '../../types'; 


const TareaState = props => {
    const initialState = {
        tareasProyecto: [],
        errorTarea: false,
        tareaSeleccionada: null
    }
    // crear dispatch y state
    const [state, dispatch] = useReducer(tareaReducer, initialState);

    //FUNCIONES
    // obtener tareas de un proyecto
    const obtenerTareas = async (proyecto) => {
        console.log(proyecto)
        try {
            const resultado = await clientAxios.get('/api/tareas/', {params: {proyecto:proyecto}})
            console.log(resultado)
            dispatch({
                type:TAREAS_PROYECTO,
                payload: resultado.data.tareas
                
        })
       } catch (error) {
           console.log(error)
       }
    }  
    // agregar tarea a proyecto
    const agregarTarea = async tarea => {
        try {
            const resultado = await clientAxios.post('/api/tareas',tarea);
            console.log(resultado.data.tarea)
            dispatch({
                type: AGREGAR_TAREA,
                payload: resultado.data.tarea
            })
        } catch (error) {
            console.log(error)
        }
    } 
    // validar tarea y muestra error
    const validarTarea = () => {
        dispatch({
            type: VALIDAR_TAREA
        })
    }
    // eliminar tarea por ID
    const eliminarTarea = async (tarea, proyecto) => {
        try {
            await clientAxios.delete(`/api/tareas/${tarea}`, {params:{proyecto}})
            dispatch({
                type: ELIMINAR_TAREA,
                payload:tarea
            })
        } catch (error) {
            console.log(error)   
        }
    }
    // cambiar estado tarea
    // const cambiarEstadoTarea = tarea => {
    //     dispatch({
    //         type: ESTADO_TAREA,
    //         payload: tarea
    //     })
    // }
    // extrae una tarea para editar
    const guardarTareaActual = tarea => {
        dispatch({
            type: TAREA_ACTUAL,
            payload: tarea
        })
    }
    // editar tarea
    const actualizarTarea = async tarea => {
        console.log(tarea)
        try {
            const resultado = await clientAxios.put(`/api/tareas/${tarea._id}`, tarea);
            console.log(resultado)
            dispatch({
                type: ACTUALIZAR_TAREA,
                payload: resultado.data.tareaExiste
            })
        } catch (error) {
            console.log(error)
        }

    }
    return (
        <tareaContext.Provider 
            value={{
                tareasProyecto: state.tareasProyecto,
                errorTarea: state.errorTarea,
                tareaSeleccionada: state.tareaSeleccionada,
                obtenerTareas,
                agregarTarea,
                validarTarea,
                eliminarTarea,
                // cambiarEstadoTarea,
                guardarTareaActual,
                actualizarTarea: actualizarTarea

            }}
        >
            {props.children}
        </tareaContext.Provider>

    )
}

export default TareaState;