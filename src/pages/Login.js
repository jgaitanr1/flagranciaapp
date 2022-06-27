import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

import md5 from 'md5';
import Cookies from 'universal-cookie';
import axios from 'axios';

import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
import { environment } from '../components/baseUrl';

function Login(props) {
    //login baseurl
    const baseUrl = environment.baseUrl + "usuario";
    const cookies = new Cookies();
    let navigate = useNavigate();
    const toast = useRef(null);
    const [form, setForm] = useState({
        username: '',
        password: ''
    });
    const handleChange = e => {
        const { name, value } = e.target;
        setForm({
            ...form,
            [name]: value
        });
        // console.log(form);
    }

    const iniciarSesion = async () => {
        await axios.get(baseUrl + '/' + form.username + '/' + md5(form.password))
            .then(response => {
                return response.data;
            }).then(response => {
                if (response.length > 0) {
                    var respuesta = response[0];
                    cookies.set('id', respuesta.id, { path: '/' });
                    cookies.set('nombres', respuesta.nombres, { path: '/' });
                    cookies.set('apellidos', respuesta.apellidos, { path: '/' });
                    cookies.set('dni', respuesta.dni, { path: '/' });
                    cookies.set('username', respuesta.username, { path: '/' });
                    cookies.set('estado', respuesta.estado, { path: '/' });
                    cookies.set('depNombre', respuesta.depNombre, { path: '/' });
                    cookies.set('dependencia', respuesta.dependencia, { path: '/' });
                    toast.current.show({ severity: 'success', summary: 'Logeado Correctamente', detail: 'Bienvenido ' + respuesta.nombres + ' ' + respuesta.apellidos, life: 3000 });
                    // toast.current.show({ severity: 'error', summary: 'Alerta de Carga', detail: 'Hola, ' + cookies.get('nombres') + ' ' + cookies.get('apellidos') + ' tienes carga pendiente por resolver.', life: 5000 });
                    setTimeout(() => {
                        navigate('/');
                    }, 1500);
                } else {
                    toast.current.show({ severity: 'error', summary: 'Datos Incorrectos', detail: 'Usuario o Contraseña incorrectos', life: 5000 });
                }
            })
            .catch(error => {
                console.log(error);
            })

    }

    useEffect(() => {
        if (cookies.get('id')) {
            navigate('/');
        }
        document.documentElement.style.fontSize = 12 + 'px';
    }, []);

    return (
        <>
            <Toast ref={toast} />
            <div className="surface-ground px-4 py-8 md:px-4 lg:px-8 flex align-items-center justify-content-center">
                <div className="surface-card p-4 shadow-2 border-round w-full lg:w-6">
                    <div className="text-center font-bold mb-5">
                        <img src="/logos/logo.svg" alt="hyper" height={130} className="mb" />
                        <div className="text-red-900 text-3xl font-bold">UNIDAD DE FLAGRANCIA</div>
                        <span className="text-400 text-2xl font-medium line-height-3">Justicia Pronta, cumplida y Amable</span>
                        {/* <a className="font-medium no-underline ml-2 text-blue-500 cursor-pointer">Create today!</a> */}
                    </div>

                    <div>
                        <label htmlFor="email" className="block text-900 font-medium mb-2">Usuario</label>
                        <InputText id="username" type="text" className="w-full mb-3" name="username" onChange={handleChange} />

                        <label htmlFor="password" className="block text-900 font-medium mb-2">Clave</label>
                        <InputText id="password" type="password" className="w-full mb-3" name="password" onChange={handleChange} />

                        <div className="flex align-items-center justify-content-between mb-6">
                            <div className="flex align-items-center">
                                {/* <Checkbox id="rememberme" onChange={e => setChecked(e.checked)} checked={checked} className="mr-2" /> */}
                                {/* <label htmlFor="rememberme">Acuérdate de mí</label> */}
                            </div>
                            {/* <a className="font-medium no-underline ml-2 text-blue-500 text-right cursor-pointer">Forgot your password?</a> */}
                        </div>

                        <Button label="Iniciar Sesion" icon="pi pi-user" className="w-full" onClick={() => iniciarSesion()} />
                    </div>
                </div>
            </div>
        </>
    );
}

export default Login;