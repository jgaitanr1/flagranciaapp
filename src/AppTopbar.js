import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import classNames from "classnames";
import Cookies from 'universal-cookie';

export const AppTopbar = (props) => {
    let navigate = useNavigate();
    const cookies = new Cookies();

    const cerrarSesion = () => {
        cookies.remove('id', { path: '/' });
        cookies.remove('nombres', { path: '/' });
        cookies.remove('apellidos', { path: '/' });
        cookies.remove('dni', { path: '/' });
        cookies.remove('username', { path: '/' });
        cookies.remove('estado', { path: '/' });
        cookies.remove('depNombre', { path: '/' });
        cookies.remove('dependencia', { path: '/' });
        navigate('/login');
    }

    useEffect(() => {
        if (!cookies.get('id')) {
            navigate('/login');
        }
    }, []);

    return (
        <div className="layout-topbar">
            <Link to="/" className="layout-topbar-logo">
                <img src="/logos/logo.svg" alt="logo" />
                <div className="text-red-900 font-bold">Unidad de Flagrancia</div>
            </Link>

            <button type="button" className="p-link  layout-menu-button layout-topbar-button" onClick={props.onToggleMenuClick}>
                <i className="pi pi-bars" />
            </button>

            <button type="button" className="p-link layout-topbar-menu-button layout-topbar-button" onClick={props.onMobileTopbarMenuClick}>
                <i className="pi pi-ellipsis-v" />
            </button>

            <ul className={classNames("layout-topbar-menu lg:flex origin-top", { "layout-topbar-menu-mobile-active": props.mobileTopbarMenuActive })}>
                <li>
                    <button className="p-link layout-topbar-button" onClick={props.onMobileSubTopbarMenuClick}>
                        <i className="pi pi-calendar" />
                        <span>Eventos</span>
                    </button>
                </li>
                <li>
                    <button className="p-link layout-topbar-button" onClick={props.onMobileSubTopbarMenuClick}>
                        <i className="pi pi-cog" />
                        <span>Configuraciones</span>
                    </button>
                </li>
                <li>
                    <button className="p-link layout-topbar-button" onClick={props.onMobileSubTopbarMenuClick}>
                        <i className="pi pi-user" />
                        <span>Perfil</span>
                    </button>
                </li>
                <li>
                    <button className="p-link layout-topbar-button" onClick={cerrarSesion}>
                        <i className="pi pi-sign-out" />
                        <span>Cerrar Sesion</span>
                    </button>
                </li>
            </ul>
        </div>
    );
};
