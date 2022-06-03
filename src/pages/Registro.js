import React, { useState, useEffect, useRef } from 'react';//rsc
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'universal-cookie';

import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';

import { environment } from '../components/baseUrl';

export const Registro = () => {

    let empty = {
        id: null,
        nombre: '',
        documento: '',
        situacionJuridica: '',
        sentencia: '',
        latitud: '',
        longitud: '',
        usuarioRegistro: '',
        fecRegistro: '',
        estadoFlagrante: '',
        estado: true
    };

    const cookies = new Cookies();

    const [entidad, setEntidad] = useState(empty);
    const [data, setData] = useState(null);
    const [disable, setDisable] = useState(false);
    const baseUrl = environment.baseUrl + "flagrancia/";
    const toast = useRef(null);

    let navigate = useNavigate();

    useEffect(() => {
        geopos();
    }, []);

    const geopos = () => {
        navigator.geolocation.getCurrentPosition(position => {
            var lat = position.coords.latitude;
            var lon = position.coords.longitude;
            entidad.latitud = lat+'';
            entidad.longitud = lon+'';
        })
    }

    const onInputChange = (e, name) => {
        const val = (e.target && e.target.value) || '';
        let _entidad = { ...entidad };
        _entidad[`${name}`] = val;
        setEntidad(_entidad);
        console.log(entidad);
    }

    const peticionPost = async () => {
        let date = new Date();
        // let output = String(date.getDate()).padStart(2, '0') + '/' + String(date.getMonth() + 1).padStart(2, '0') + '/' + date.getFullYear();
        setDisable(true);
        entidad.fecRegistro = date.toLocaleString();
        entidad.usuarioRegistro = cookies.get('username');
        entidad.estadoFlagrante = 'Registrado';

        delete entidad.id;
        await axios.post(baseUrl, entidad)
            .then(response => {
                setData(data.concat(response.data));
            }).catch(error => {
                console.log(error);
            })
        toast.current.show({ severity: 'info', summary: 'Confirmado', detail: 'Ingreso Correcto', life: 2000 });
        setTimeout(() => {
            navigate('/prueba');
        }, 2000);
    }



    return (
        <>
            <Toast ref={toast} />
            <div className="col-12">
                <div className="card">
                    <h5>Ingresar datos del Detenido</h5>
                    <br />
                    <div className="field p-fluid">
                        <label htmlFor="nombre">Nombre Completo</label>
                        <InputText id="nombre" type="text" name="nombre" onChange={(e) => onInputChange(e, 'nombre')} />
                        <small>Consignar el nombre que proporciona el Detenido</small>
                    </div>
                    <div className="field p-fluid">
                        <label htmlFor="documento">N° Documento de Identidad</label>
                        <InputText id="documento" type="text" name="documento" onChange={(e) => onInputChange(e, 'documento')} />
                        <small>Consignar el numero documento que proporciona el Detenido</small>
                    </div>
                    <br />
                    <Button label="Registrar" disabled={disable} onClick={() => peticionPost(this)} />
                </div>
            </div>
        </>
    );
};

export default Registro;