import React, {useState, useContext, useEffect} from 'react';
import {Link} from 'react-router-dom';

import AlertaContext from '../../context/alertas/alertaContext';
import AuthContext from '../../context/autenticacion/authContext';

const NuevaCuenta = (props) => {
    //extraer valores del context
    const authContext = useContext(AuthContext);
    const {mensaje, autenticado, registrarUsuario} = authContext;

    const alertaContext = useContext(AlertaContext);
    const {alerta, mostrarAlerta} = alertaContext;

    useEffect(() => {
        if(autenticado){
            props.history.push('/proyectos');
        }
        if(mensaje){
            mostrarAlerta(mensaje.msg, mensaje.categoria);
        }
    }, [mensaje,autenticado, props.history]);

    // state para iniciar sesión
    const [usuario, setUsuario] = useState({
        nombre: '',
        email: '',
        password: '',
        confirmar:''
    });
    const {nombre, email, password, confirmar} = usuario;
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
        if(nombre.trim() === '' || email.trim() === '' || password.trim() === '' || confirmar.trim() === ''){
            mostrarAlerta('Todos los campos son obligatorios', 'alerta-error');
            return;
        }
        // password
        if(password.length < 6){
            mostrarAlerta('Password tiene que ser de al menos 6 caracteres', 'alerta-error');
            return;
        }
        if(password !== confirmar){
            mostrarAlerta('Password no son los mismos', 'alerta-error');
            return;
        }
        //pasarlo al action
        registrarUsuario({
            nombre,
            email,  
            password
        })
    }
    return ( 
        <div className="form-usuario">
            
            <div className="contenedor-form sombra-dark">
            {alerta ? (<div className={`alerta ${alerta.categoria}`} >{alerta.msg}</div>) : null }
                <h1>Crear Cuenta</h1>
                <form onSubmit={onSubmit}>
                <div className="campo-form">
                        <label htmlFor="nombre">Nombre Completo</label>
                        <input 
                            type="text"
                            id="nombre"
                            name="nombre"
                            placeholder="Ingresa tu Nombre"
                            value={nombre}
                            onChange={onChange}
                        />
                    </div>

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
                        <label htmlFor="confirmar">Confirmar Contraseña</label>
                        <input 
                            type="password"
                            id="confirmar"
                            name="confirmar"
                            placeholder="Confirma tu pass"
                            value={confirmar}
                            onChange={onChange}
                        />
                    </div>

                    <div className="campo-form">
                        <input
                            type="submit"
                            className="btn btn-primario btn-block"
                            value="Registar"
                        />
                    </div>
                </form>
                <Link to={'/'} className="enlace-cuenta">
                    Ya tiene una cuenta
                </Link>
            </div>
            

        </div>
     );
}
 
export default NuevaCuenta;