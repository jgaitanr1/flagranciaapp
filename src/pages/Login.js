import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';

import md5 from 'md5';
import Cookies from 'universal-cookie';
import axios from 'axios';


function Login(props) {

    const baseUrl ="https://localhost:44355/api/usuario";
    const cookies = new Cookies();

    let navigate = useNavigate();
    const [form, setForm] = useState({
        username:'',
        password:''
    });
    const handleChange=e=>{
        const {name, value} = e.target;
        setForm({
            ...form,
            [name]: value
        });
        console.log(form);
    }

    const iniciarSesion=async()=>{
        await axios.get(baseUrl+'/'+form.username+'/'+md5(form.password))
        .then(response=>{
            return response.data;
        }).then(response=>{
            if(response.length > 0){
                var respuesta = response[0];
                // console.log(respuesta);
                cookies.set('id', respuesta.id, {path: '/'});
                cookies.set('nombres', respuesta.nombres, {path: '/'});
                cookies.set('apellidos', respuesta.apellidos, {path: '/'});
                cookies.set('dni', respuesta.dni, {path: '/'});
                cookies.set('username', respuesta.username, {path: '/'});
                cookies.set('estado', respuesta.estado, {path: '/'});
                cookies.set('depNombre', respuesta.depNombre, {path: '/'});
                cookies.set('dependencia', respuesta.dependencia, {path: '/'});
                alert("Bienvenido al sistema de Flagrancia "+respuesta.nombres);
                navigate('/menu');
            }else{
                alert("El usuario o password es incorrecto");
            }
        })
        .catch(error =>{
            console.log(error);
        })
    }

    return (
        <div className='containerPrincipal'>
            <div  className='containerLogin'>
                <div className='form-group'>
                    <label>Usuario: </label>
                    <br />
                    <input type="text" className='form-control' name="username" onChange={handleChange} />
                    <br />
                    <label>Password: </label>
                    <br />
                    <input type="password" className='form-control' name="password"  onChange={handleChange} />
                    <br />
                    <button className='btn btn-primary' onClick={()=>iniciarSesion()}>Iniciar Sesion</button>
                </div>
            </div>
        </div>
    );
}

export default Login;