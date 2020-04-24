import React, {useReducer} from 'react';

import authReducer from './authReducer';
import authContext from './authContext';

import clientAxios from '../../config/axios'
import tokenAuth from '../../config/tokenAuth';

import {
    REGISTRO_ERROR,
    REGISTRO_EXITOSO,
    OBTENER_USUARIO,
    LOGIN_ERROR,
    LOGIN_EXITOSO,
    CERRAR_SESION
} from '../../types'; 

const AuthState = props => {
    const initialState = {
        token: localStorage.getItem('token'),
        autenticado: null,
        cargando: true,
        usuario: null,
        mensaje: null
    }
    // crear dispatch y state
    const [state, dispatch] = useReducer(authReducer, initialState);

    // funciones
    // registart usuario
    const registrarUsuario = async datos => {
      try {
          const respuesta = await clientAxios.post('/api/usuarios', datos);
          dispatch({
              type: REGISTRO_EXITOSO,
              payload:respuesta.data
          })
          // obtener usuario
          await usuarioAutenticado();
      } catch (error) {
          
          const alerta ={
              msg: error.response.data.msg,
              categoria: 'alerta-error'
          }
          dispatch({
              type: REGISTRO_ERROR,
              payload: alerta
          })
      }  
    }
    // loguear usuario
    const usuarioAutenticado = async () => {
        const token = localStorage.getItem('token');
        
        if(token){
            tokenAuth(token);
        }
        try {
            const respuesta = await clientAxios.get('/api/auth');
           
            dispatch({
                type: OBTENER_USUARIO,
                payload:respuesta.data.usuario
            })
        } catch (error) {
            console.log(error.response);
            const alerta ={
                msg: error.response.data.msg,
                categoria: 'alerta-error'
            }
            dispatch({
                type: LOGIN_ERROR,
                payload: alerta
            })
        }
    }

    // iniciar sesion
    const iniciarSesion = async datos => {
        try {
            const respuesta = await clientAxios.post('api/auth', datos)
            
            dispatch({
                type: LOGIN_EXITOSO,
                payload: respuesta.data
            })
            await usuarioAutenticado();
        } catch (error) {
            console.log(error.response)
            const alerta ={
                msg: error.response.data.msg,
                categoria: 'alerta-error'
            }
            dispatch({
                type:LOGIN_ERROR,
                payload:alerta
            })
        }
    }
    // cerrar sesion
    const cerrarSesion = () => {
        dispatch({
            type: CERRAR_SESION
        })
    }
    return (
        <authContext.Provider 
            value={{
                token: state.token,
                autenticado: state.autenticado,
                cargando: state.cargando,
                usuario: state.usuario,
                mensaje: state.mensaje,
                registrarUsuario,
                iniciarSesion,
                usuarioAutenticado,
                cerrarSesion
            }}
        >
            {props.children}
        </authContext.Provider>

    )
}


export default AuthState;