import React from 'react';
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import { Timeline } from 'primereact/timeline';
import classNames from 'classnames';

export const TimelineDemo = () => {
    const customEvents = [
        {
            status: 'Registro de flagrante',
            date: '27/05/2022 10:30',
            icon: 'pi pi-inbox',
            color: '#9C27B0',
            image: 'game-controller.jpg'
        },
        { status: 'Ministerio Publico', date: '27/05/2022 14:00', icon: 'pi pi-cog', color: '#673AB7' },
        { status: 'Poder Judicial', date: '28/05/2022 16:15', icon: 'pi pi-envelope', color: '#FF9800' },
        { status: 'Resultado', date: '28/05/2022 10:00', icon: 'pi pi-check', color: '#607D8B' }
    ];


    const customizedContent = (item) => {
        return (
            <Card title={item.status} subTitle={item.date}>
                {/* { item.image && <img src={`assets/demo/images/product/${item.image}`} onError={(e) => e.target.src = 'https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png'} alt={item.name} width={200} className="shadow-2 mb-3" />} */}
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore sed consequuntur error repudiandae numquam deserunt
                quisquam repellat libero asperiores earum nam nobis, culpa ratione quam perferendis esse, cupiditate neque quas!</p>
                <Button label="Read more" className="p-button-text"></Button>
            </Card>
        );
    };

    const customizedMarker = (item) => {
        return (
            <span className="flex w-2rem h-2rem align-items-center justify-content-center text-white border-circle z-1 shadow-2" style={{ backgroundColor: item.color }}>
                <i className={classNames('marker-icon', item.icon)}></i>
            </span>
        );
    };

    return <div className="grid timeline-demo">
        <div className="col-12">
            <div className="card">
                <h4>Linea de Tiempo de Flagrante</h4>
                <h5>Caso: 000234</h5>
                <br />
                <Timeline value={customEvents} align="alternate" className="customized-timeline" marker={customizedMarker} content={customizedContent} />

            </div>
        </div>
    </div>
}


export default TimelineDemo;