import React, { useState, useEffect, useRef } from 'react';//rsc
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'universal-cookie';

import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Dropdown } from "primereact/dropdown";
import { Toast } from 'primereact/toast';
import { RadioButton } from 'primereact/radiobutton';

import { environment } from '../components/baseUrl';

export const Registro = () => {

    let empty = {
        id: null,
        nombre: '',
        documento: '',
        tDocumento: '',
        genero: '',
        nacionalidad: '',
        situacionJuridica: '',
        sentencia: '',
        audiencia: '',
        acusacion: '',
        descripcion: '',
        latitud: '',
        longitud: '',
        tipoArresto: '',
        usuarioRegistro: '',
        fecRegistro: null,
        estadoFlagrante: '',
        estado: true
    };

    const tipodocumento = [
        "Documento Nacional de Identidad",
        "Carnet de Extranjeria"
    ];

    const cookies = new Cookies();

    const [entidad, setEntidad] = useState(empty);
    // const [data, setData] = useState(null);
    const [disable, setDisable] = useState(false);
    const [radioValue, setRadioValue] = useState(null);
    const baseUrl = environment.baseUrl + "flagrancia/";
    const toast = useRef(null);

    let navigate = useNavigate();


    const geopos = () => {
        navigator.geolocation.getCurrentPosition(position => {
            var lat = position.coords.latitude;
            var lon = position.coords.longitude;
            entidad.latitud = lat + '';
            entidad.longitud = lon + '';
        })
    }

    useEffect(() => {
        geopos();
    }, []);


    const onInputChange = (e, name) => {
        const val = (e.target && e.target.value) || '';
        let _entidad = { ...entidad };
        _entidad[`${name}`] = val;
        setEntidad(_entidad);
        console.log(entidad);
    }

    const onInputChangeRadio = (e, name) => {
        const val = (e.target && e.target.value) || '';
        let _entidad = { ...entidad };
        _entidad[`${name}`] = val;
        setEntidad(_entidad);
        console.log(entidad);
        setRadioValue(e.value);
    }


    const peticionPost = async () => {
        let date = new Date();
        // let output = String(date.getDate()).padStart(2, '0') + '/' + String(date.getMonth() + 1).padStart(2, '0') + '/' + date.getFullYear();
        setDisable(true);
        if (entidad.tipoArresto === '') {
            entidad.tipoArresto = 'Policial';
        }
        entidad.fecRegistro = date.toLocaleString();
        entidad.usuarioRegistro = cookies.get('username');
        entidad.estadoFlagrante = 'Detenido';
        // entidad.situacionJuridica = 'pendiente';
        // entidad.sentencia = 'pendiente';

        delete entidad.id;
        await axios.post(baseUrl, entidad)
            .then(response => {
                console.log(response);
                toast.current.show({ severity: 'info', summary: 'Confirmado', detail: 'Ingreso Correcto', life: 2000 });
                setTimeout(() => {
                    navigate('/tarjetaDerechos');
                }, 2000);
            }).catch(error => {
                console.log(error);
                toast.current.show({ severity: 'error', summary: 'Datos Incompletos', detail: 'Debes colocar nombre y N° documento', life: 5000 });
                setDisable(false);
            })

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
                        <InputText id="nombre" type="text" name="nombre" onChange={(e) => onInputChange(e, 'nombre')} autoFocus required />
                        <small>Consignar el nombre que proporciona el Detenido</small>
                    </div>
                    <div className="field p-fluid">
                        <label htmlFor="tDocumento">Tipo de Documento</label>
                        <Dropdown id="tDocumento" options={tipodocumento} value={entidad.tDocumento} onChange={(e) => onInputChange(e, 'tDocumento')} required />
                        <small>Consignar el numero documento que proporciona el Detenido</small>
                    </div>
                    <div className="field p-fluid">
                        <label htmlFor="documento">N° Documento</label>
                        <InputText id="documento" type="text" name="documento" onChange={(e) => onInputChange(e, 'documento')} required />
                        <small>Consignar el numero documento que proporciona el Detenido</small>
                    </div>
                    <div className="field">
                        <label htmlFor="genero" className='mb-3'>Tipo de Arresto</label>
                        <div className="grid">
                            <div className="col-12 md:col-4">
                                <div className="field-radiobutton">
                                    <RadioButton inputId="option1" name="option" value="Policial" checked={radioValue === 'Policial'} onChange={(e) => onInputChangeRadio(e, 'tipoArresto')} />
                                    <label htmlFor="option1">Arresto Policial</label>
                                </div>
                            </div>
                            <div className="col-12 md:col-4">
                                <div className="field-radiobutton">
                                    <RadioButton inputId="option2" name="option" value="Ciudadano" checked={radioValue === 'Ciudadano'} onChange={(e) => onInputChangeRadio(e, 'tipoArresto')} />
                                    <label htmlFor="option2">Arresto Ciudadano</label>
                                </div>
                            </div>
                        </div>
                        <small>Consignar el tipo de arresto</small>
                    </div>
                    <br />
                    <Button label="Registrar" disabled={disable} onClick={() => peticionPost(this)} />
                </div>
            </div>
        </>
    );
};

export default Registro;