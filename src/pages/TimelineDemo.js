import React, { useState, useEffect } from 'react';

import { Card } from 'primereact/card';
import { Timeline } from 'primereact/timeline';

import classNames from 'classnames';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { environment } from '../components/baseUrl';


export const TimelineDemo = () => {

    const {id} = useParams();

    const baseUrl = environment.baseUrl + "dflagrancia/det/" + id;

    let empty = {
        id: null,
        descripcion: '',
        dependencia: '',
        usuarioRegistro: '',
        fecRegistro: null,
        idFlagrancia: null
    };

    
    const [product, setProduct] = useState(empty);
    const [data, setData] = useState(null);

    // const customEvents = [
    //     {
    //         status: 'Registro de flagrante',
    //         date: '27/05/2022 10:30',
    //         icon: 'pi pi-inbox',
    //         color: '#9C27B0',
    //         image: 'game-controller.jpg'
    //     },
    //     { status: 'Ministerio Publico', date: '27/05/2022 14:00', icon: 'pi pi-cog', color: '#673AB7' },
    //     { status: 'Poder Judicial', date: '28/05/2022 16:15', icon: 'pi pi-envelope', color: '#FF9800' },
    //     { status: 'Resultado', date: '28/05/2022 10:00', icon: 'pi pi-check', color: '#607D8B' }
    // ];

    const peticionGet = async () => {
        await axios.get(baseUrl)
            .then(response => {
                setData(response.data);
            }).catch(error => {
                console.log(error);
            })
    }

    useEffect(() => {
        peticionGet();
    }, []);

    const customizedContent = (item) => {
        let date = item.fecRegistro;
        return (
            <Card title={item.dependencia} subTitle={item.fecRegistro} >
                <p>{item.descripcion}</p>
                {/* <Button label="Read more" className="p-button-text"></Button> */}
            </Card>
        );
    };

    const customizedMarker = (item) => {
        let color ='';
        let icon ='';
        // if(item.id === 1){
        //     color = '#FF9800';
        //     icon = 'pi pi-inbox'
        // }else 
        if(item.dependencia === 'Ministerio Publico'){
            color = '#00416A';
            icon = 'pi pi-cog'
        }else if(item.dependencia === 'Poder Judicial'){
            color = '#8b0000';
            icon = 'pi pi-cog'
        }else if(item.dependencia === 'Policia Nacional del Peru'){
            color = '#2d572c';
            icon = 'pi pi-cog'
        }
        else{
            color = '#9C27B0';
            icon = 'pi pi-cog'
        }
        return (
            <span className="flex w-2rem h-2rem align-items-center justify-content-center text-white border-circle z-1 shadow-2" style={{ backgroundColor: color }}>
                <i className={classNames('marker-icon', icon)}></i>
            </span>
        );
    };

    return <div className="grid timeline-demo">
        <div className="col-12">
            <div className="card">
                <h4>Linea de Tiempo de Flagrante</h4>
                <h5>Codigo Unico: {id}</h5>
                <br />
                <Timeline value={data} align="alternate" className="customized-timeline" marker={customizedMarker} content={customizedContent} />
            </div>
        </div>
    </div>
}


export default TimelineDemo;