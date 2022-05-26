import React, {useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'universal-cookie';
import { Button } from 'primereact/button';

function Menu(props) {
    const cookies = new Cookies();
    let navigate = useNavigate();

    const cerrarSesion=() => {
        cookies.remove('id', { path: '/' });
        cookies.remove('nombres', { path: '/' });
        cookies.remove('apellidos', { path: '/' });
        cookies.remove('dni', { path: '/' });
        cookies.remove('username', { path: '/' });
        cookies.remove('estado', { path: '/' });
        cookies.remove('depNombre', { path: '/' });
        cookies.remove('dependencia', { path: '/' });
        navigate('/');
    }

    useEffect(()=>{
        if(!cookies.get('id')){
            navigate('/');
        }
    },[]);

    return (
        <div className='container'>
            <br />
            <Button onClick={()=>cerrarSesion()}>Cerrar Sesion</Button>
            <br />
            <h5>ID: {cookies.get('id')}</h5>
            <br />
            <h5>Nombre: {cookies.get('nombres')}</h5>
            <br />
            <h5>ID: {cookies.get('apellidos')}</h5>
            <br />
        </div>
    );
}

export default Menu;