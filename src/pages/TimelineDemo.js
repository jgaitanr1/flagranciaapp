import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";

import { Card } from 'primereact/card';
import { Timeline } from 'primereact/timeline';

import classNames from 'classnames';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { environment } from '../components/baseUrl';


export const TimelineDemo = () => {

    const { id } = useParams();

    const baseUrl = environment.baseUrl + "dflagrancia/det/" + id;

    const [data, setData] = useState(null);

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
        return (
            <Card title={item.dependencia} subTitle={item.fecRegistro} >
                <p>{item.descripcion}</p>
            </Card>
        );
    };

    const customizedMarker = (item) => {
        let color = '';
        let icon = '';
        // if(item.id === 1){
        //     color = '#FF9800';
        //     icon = 'pi pi-inbox'
        // }else 
        if (item.dependencia === 'Ministerio Publico') {
            color = '#00416A';
            icon = 'pi pi-cog';
        } else if (item.dependencia === 'Poder Judicial') {
            color = '#8b0000';
            icon = 'pi pi-cog';
        } else if (item.dependencia === 'Policia Nacional del Peru') {
            color = '#2d572c';
            icon = 'pi pi-cog';
        } else if (item.dependencia === 'Sistema de Flagrancia') {
                color = '#607D8B';
                icon = 'pi pi-check';
        }
        else {
            color = '#9C27B0';
            icon = 'pi pi-cog';
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