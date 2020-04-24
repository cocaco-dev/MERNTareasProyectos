import React, {useState, useContext, useEffect} from 'react';
import {Link} from 'react-router-dom';

import AlertaContext from '../../context/alertas/alertaContext';
import AuthContext from '../../context/autenticacion/authContext';

const Login = (props) => {
    //extraer valores del context
    const authContext = useContext(AuthContext);
    const {mensaje, autenticado, iniciarSesion} = authContext;

    const alertaContext = useContext(AlertaContext);
    const {alerta, mostrarAlerta} = alertaContext;

    useEffect(() => {
        if(autenticado){
            props.history.push('/proyectos');
        }
        if(mensaje){
            mostrarAlerta(mensaje.msg, mensaje.categoria);
        }
    }, [mensaje,autenticado,props.history]);
    // state para iniciar sesión
    const [usuario, setUsuario] = useState({
        email: '',
        password: ''
    });
    const {email, password} = usuario;
    const onChange = e => {
        setUsuario({
            ...usuario,
            [e.target.name] : e.target.value
        })
    }
    // usuario inicia sesion
    const onSubmit = e => {
        e.preventDefault();
        // validar campos vacios
        if(email.trim() === '' || password.trim() === '' ){
            mostrarAlerta('Todos los campos son obligatorios', 'alerta-error');
            return;
        }
        //pasarlo al action
        iniciarSesion({
            email,  
            password
        })
    }
    return ( 
        <div className="form-usuario">
            <div className="contenedor-form sombra-dark">
                {alerta ? (<div className={`alerta ${alerta.categoria}`} >{alerta.msg}</div>) : null }
                <h1>Iniciar Sesión</h1>
                <form onSubmit={onSubmit}>
                    <div className="campo-form">
                        <label htmlFor="email">Correo Electrónico</label>
                        <input 
                            type="email"
                            id="email"
                            name="email"
                            placeholder="Ingresa tu Correo"
                            value={email}
                            onChange={onChange}
                        />
                    </div>
                    <div className="campo-form">
                        <label htmlFor="password">Contraseña</label>
                        <input 
                            type="password"
                            id="password"
                            name="password"
                            placeholder="Password"
                            value={password}
                            onChange={onChange}
                        />
                    </div>
                    <div className="campo-form">
                        <input
                            type="submit"
                            className="btn btn-primario btn-block"
                            value="Iniciar Sesión"
                        />
                    </div>
                </form>
                <Link to={'/nueva-cuenta'} className="enlace-cuenta">
                    Obtener Cuenta
                </Link>
            </div>
            

        </div>
     );
}
 
export default Login;