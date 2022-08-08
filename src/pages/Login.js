import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

import md5 from 'md5';
import Cookies from 'universal-cookie';
import axios from 'axios';

import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Checkbox } from 'primereact/checkbox';
import { Toast } from 'primereact/toast';
import { environment } from '../components/baseUrl';

function Login(props) {
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
        document.documentElement.style.background = '#5E181F';
    }, []);


    const styles = {
        body: {
            // height: '100%',
            // width: '100%',
            // background: '#9B1B21',
            backgroundImage: "url(/logos/bglogin2.png)",
            color: 'white',
            height: '100vh',
            width: '100vw',
            display: 'flex',
            backgroundPosition: 'center',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
        },
        component: {
            background: '#9B1B21',
            color: 'white',
        },
        texto: {
            color: '#9B1B21',
        },
        formulario: {
            // opacity: '0.5',
            border: 'thick solid #FFFFFF',
            opacity: '1',
        }

    }



    return (
        <>
            <Toast ref={toast} />
            <div style={styles.body} className="surface-ground px-4 py-8 md:px-4 lg:px-8 flex align-items-center justify-content-center">
                {/* <img src="/logos/logoufb.png" alt="hyper" height={150} className="mb-0" /> */}
                {/* <div className="surface-ground px-4 py-8 md:px-4 lg:px-8 flex align-items-center justify-content-center"> */}
                <div style={styles.formulario} className="surface-card p-6 shadow-8 border-round w-full lg:w-4 mb-4">
                    <div className="mb-2">
                        <br />
                        <div className="p-inputgroup">
                            <span style={styles.component} className="p-inputgroup-addon">
                                <i className="pi pi-user"></i>
                            </span>
                            <InputText placeholder="Usuario" id="username" type="text" name="username" onChange={handleChange} />
                        </div>
                        <br />
                        <div className="p-inputgroup mb-4">
                            <span style={styles.component} className="p-inputgroup-addon">
                                <i className="pi pi-lock"></i>
                            </span>
                            <InputText placeholder="Contraseña" id="password" type="password" name="password" onChange={handleChange} />
                        </div>
                        <br />

                        <div style={styles.texto} className="flex align-items-center justify-content-between mb-6">
                            <div className="flex align-items-center">
                                {/* <Checkbox id="rememberme" onChange={e => setChecked(e.checked)} checked={checked} className="mr-2" /> */}
                                <Checkbox id="rememberme" className="mr-2" />
                                <label htmlFor="rememberme">Acuérdate de mí</label>
                            </div>
                            <label className="font-medium no-underline ml-2 text-right cursor-pointer">Olvidaste tu contraseña?</label>
                        </div>

                        <Button style={styles.component} label="Iniciar Sesion" icon="pi pi-user" className="w-full" onClick={() => iniciarSesion()} />
                    </div>
                </div>
                {/* </div> */}
            </div>
        </>
    );
}

export default Login;