import React, {useReducer} from 'react';

import proyectoReducer from './proyectoReducer';
import proyectoContext from './proyectoContext';

import {FORMULARIO_PROYECTO, OBTENER_PROYECTOS, AGREGAR_PROYECTO, VALIDAR_FORMULARIO, PROYECTO_ACTUAL, ELIMINAR_PROYECTO, PROYECTO_ERROR} from '../../types'; 


import clientAxios from '../../config/axios'

const ProyectoState = props => {
    
    const initialState = {
        proyectos: [],
        formulario: false,
        errorFormulario: false,
        proyecto: null,
        mensaje: null
    }
    // dispatch para ejecutar acciones
    const [state, dispatch] = useReducer(proyectoReducer, initialState);

    // serie de funciones para el CRUD
    const mostrarFormulario = () => {
        dispatch({
            type: FORMULARIO_PROYECTO
        })
    }
    // obtener los proyectos
    const obtenerProyectos = async () => {
        try {
            const resultado = await clientAxios.get('/api/proyectos');
            dispatch({
                type: OBTENER_PROYECTOS,
                payload: resultado.data.proyectos
            })
        } catch (error) {
            console.log(error)
        }
        
    }
    // agregar nuevo proyecto
    const agregarProyecto = async proyecto => {
        try {
            const resultado = await clientAxios.post('/api/proyectos', proyecto);
            console.log(resultado)
            dispatch({
                type:AGREGAR_PROYECTO,
                payload: resultado.data
            })
        } catch (error) {
            console.log(error)
        }
    }
    // mostrar error formulario
    const mostrarError = () => {
        dispatch({
            type: VALIDAR_FORMULARIO
        })
    }
    //seleccion de proyecto paraeditar
    const proyectoActual = proyectoId => {
        dispatch({
            type: PROYECTO_ACTUAL,
            payload:proyectoId
        })
    }
    const eliminarProyecto = async proyectoId => {
        try {
            await clientAxios.delete(`/api/proyectos/${proyectoId}`);
            dispatch({
                type: ELIMINAR_PROYECTO,
                payload:proyectoId
            })
        } catch (error) {
            const alerta= {
                msg:'hubo un error',
                categoria: 'alerta-error'
            }
            dispatch({
                type: PROYECTO_ERROR,
                payload: alerta
            })
            console.log(error)
        }
    }

    return (
        <proyectoContext.Provider
            value={{
                proyectos: state.proyectos,
                formulario: state.formulario,
                errorFormulario: state.errorFormulario,
                proyecto: state.proyecto,
                mensaje: state.mensaje,
                mostrarFormulario,
                obtenerProyectos,
                agregarProyecto,
                mostrarError,
                proyectoActual,
                eliminarProyecto

            }}
        >
            {props.children}
        </proyectoContext.Provider>
    );
}


export default ProyectoState;