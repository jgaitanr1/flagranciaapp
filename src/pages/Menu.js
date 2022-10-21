import React, { useEffect, useState, useRef } from 'react';
import { useNavigate, Outlet } from 'react-router-dom';
import Cookies from 'universal-cookie';
import classNames from 'classnames';
import PrimeReact from 'primereact/api';
import { Tooltip } from 'primereact/tooltip';
import { Toast } from 'primereact/toast';

import { AppFooter } from '../AppFooter';
import { AppTopbar } from '../AppTopbar';
import { AppMenu } from '../AppMenu';

const Menu = () => {
    const cookies = new Cookies();
    let navigate = useNavigate();
    let menuClick = false;
    let mobileTopbarMenuClick = false;
    PrimeReact.ripple = true;
    const toast = useRef(null);

    const copyTooltipRef = useRef();

    const pnp = [{
        label: 'Favoritos',
        items: [
            { label: 'Inicio', icon: 'pi pi-fw pi-home', to: 'tarjetaDerechos' },
            { label: 'Buscar Detenidos', icon: 'pi pi-fw pi-desktop', to: 'flagrantes' }
        ]
    },
    {
        label: 'Policia Nacional', icon: 'pi pi-fw pi-clone',
        items: [
            { label: 'Ingreso a Sede', icon: 'pi pi-fw pi-map-marker', to: 'ingresoPNP' },
            { label: 'Validar Detenido', icon: 'pi pi-fw pi-id-card', to: 'validarPNP' }
        ]
    }]

    const patrulla = [{
        label: 'Policia Nacional', icon: 'pi pi-fw pi-clone',
        items: [
            { label: 'Tarjeta de Derechos', icon: 'pi pi-fw pi-home', to: 'tarjetaDerechos' },
            { label: 'Registro', icon: 'pi pi-fw pi-user-edit', to: 'registro' }
        ]
    }]

    const mp = [{
        label: 'Favoritos',
        items: [
            { label: 'Inicio', icon: 'pi pi-fw pi-home', to: 'tarjetaDerechos' },
            { label: 'Buscar Detenidos', icon: 'pi pi-fw pi-desktop', to: 'flagrantes' }
        ]
    },
    {
        label: 'Ministerio Publico', icon: 'pi pi-fw pi-clone',
        items: [
            { label: 'Nuevos Ingresos', icon: 'pi pi-fw pi-star', to: 'pendientePNP' },
            { label: 'Disposición Fiscal', icon: 'pi pi-fw pi-pencil', to: 'flagrantesMP' },
            { label: 'Acusación Fiscal', icon: 'pi pi-fw pi-briefcase', to: 'flagrantesAcusacion' }
        ]
    }]

    const pj = [{
        label: 'Favoritos',
        items: [
            { label: 'Inicio', icon: 'pi pi-fw pi-home', to: 'tarjetaDerechos' },
            { label: 'Buscar Detenidos', icon: 'pi pi-fw pi-desktop', to: 'flagrantes' }
        ]
    },
    {
        label: 'Poder Judicial', icon: 'pi pi-fw pi-clone',
        items: [
            { label: 'Nuevos Ingresos', icon: 'pi pi-fw pi-star', to: 'pendientePNP' },
            { label: 'Programar Audiencia', icon: 'pi pi-fw pi-calendar', to: 'flagrantesAudiencia' },
            { label: 'Registrar Sentencia', icon: 'pi pi-fw pi-ban', to: 'flagrantesPJ' }
        ]
    }]

    const adm = [{
        label: 'Favoritos',
        items: [
            { label: 'Inicio', icon: 'pi pi-fw pi-home', to: 'tarjetaDerechos' },
            { label: 'Lista de Detenidos', icon: 'pi pi-fw pi-desktop', to: 'flagrantes' }
        ]
    },
    {
        label: 'Policia Nacional', icon: 'pi pi-fw pi-clone',
        items: [
            { label: 'Ingreso a Sede', icon: 'pi pi-fw pi-map-marker', to: 'ingresoPNP' },
            { label: 'Validar Detenidos', icon: 'pi pi-fw pi-id-card', to: 'validarPNP' },
            { label: 'Registro', icon: 'pi pi-fw pi-user-edit', to: 'registro' }
        ]
    },
    {
        label: 'Ministerio Publico', icon: 'pi pi-fw pi-clone',
        items: [
            { label: 'Nuevos Ingresos', icon: 'pi pi-fw pi-star', to: 'pendientePNP' },
            { label: 'Disposición Fiscal', icon: 'pi pi-fw pi-pencil', to: 'flagrantesMP' },
            { label: 'Acusación Fiscal', icon: 'pi pi-fw pi-briefcase', to: 'flagrantesAcusacion' }
        ]
    },
    {
        label: 'Poder Judicial', icon: 'pi pi-fw pi-clone',
        items: [
            { label: 'Nuevos Ingresos', icon: 'pi pi-fw pi-star', to: 'pendientePNP' },
            { label: 'Programar Audiencia', icon: 'pi pi-fw pi-calendar', to: 'flagrantesAudiencia' },
            { label: 'Registrar Sentencia', icon: 'pi pi-fw pi-ban', to: 'flagrantesPJ' }
        ]
    }]

    function Acceder() {
        if (cookies.get('depNombre') === 'Poder Judicial') {
            return pj;
        } else if (cookies.get('depNombre') === 'Policia Nacional del Peru') {
            return pnp;
        } else if (cookies.get('depNombre') === 'Ministerio Publico') {
            return mp;
        } else if (cookies.get('depNombre') === 'Policia Nacional del Peru - IR') {
            return patrulla;
        } else {
            return adm;
        }
    }


    const stylespnp = {
        body: {
            height: '100%',
            width: '100%',
            background: '#48866F',
            backgroundImage: "url(/logos/pnp2.png)",
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            // height: '100vh',
            // width: '100vw',
            // display: 'flex',
        }
    }
    const stylesmp = {
        body: {
            height: '100%',
            width: '100%',
            background: '#0A355F',
            backgroundImage: "url(/logos/mpfnlogoazul.jpg)",
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
        }
    }
    const stylespj = {
        body: {
            height: '100%',
            width: '100%',
            background: '#871C24',
            backgroundImage: "url(/logos/pjrojo.png)",
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
        }
    }

    function Estilos() {
        if (cookies.get('depNombre') === 'Poder Judicial') {
            return stylespj;
        } else if (cookies.get('depNombre') === 'Policia Nacional del Peru') {
            return stylespnp;
        } else if (cookies.get('depNombre') === 'Ministerio Publico') {
            return stylesmp;
        } else if (cookies.get('depNombre') === 'Policia Nacional del Peru - IR') {
            return stylespnp;
        } else {
            return stylespj;
        }
    }

    function Imagen() {
        if (cookies.get('depNombre') === 'Poder Judicial') {
            return '/logos/logopj.png';
        } else if (cookies.get('depNombre') === 'Policia Nacional del Peru') {
            return '/logos/pnp2.png';
        } else if (cookies.get('depNombre') === 'Ministerio Publico') {
            return '/logos/mpfnlogo.png';
        } else if (cookies.get('depNombre') === 'Policia Nacional del Peru - IR') {
            return '/logos/pnp2.png';
        } else {
            return stylespj;
        }
    }


    const menu = Acceder();
    const styles = Estilos();

    const [layoutMode, setLayoutMode] = useState('static');
    const [layoutColorMode, setLayoutColorMode] = useState('light');
    const [inputStyle, setInputStyle] = useState('outlined');
    const [ripple, setRipple] = useState(true);
    const [staticMenuInactive, setStaticMenuInactive] = useState(false);
    const [overlayMenuActive, setOverlayMenuActive] = useState(false);
    const [mobileMenuActive, setMobileMenuActive] = useState(false);
    const [mobileTopbarMenuActive, setMobileTopbarMenuActive] = useState(false);

    function Alerta() {
        return toast.current.show({ severity: 'error', summary: 'Alerta de Carga', detail: 'Hola, ' + cookies.get('nombres') + ' ' + cookies.get('apellidos') + ' tienes carga pendiente por resolver.', life: 8000 });;
    }

    useEffect(() => {
        if (!cookies.get('id')) {
            navigate('/login');
        }
        document.documentElement.style.fontSize = 13 + 'px';
        setTimeout(() => {
            if (cookies.get('depNombre') === 'Poder Judicial') {
                return Alerta();
            } else if (cookies.get('depNombre') === 'Policia Nacional del Peru') {
                return Alerta();
            } else if (cookies.get('depNombre') === 'Ministerio Publico') {
                return Alerta();
            }
        }, 1500);

    }, []);


    const onWrapperClick = (event) => {
        if (!menuClick) {
            setOverlayMenuActive(false);
            setMobileMenuActive(false);
        }

        if (!mobileTopbarMenuClick) {
            setMobileTopbarMenuActive(false);
        }

        mobileTopbarMenuClick = false;
        menuClick = false;
    }

    const onSidebarClick = () => {
        menuClick = true;
    }

    const isDesktop = () => {
        return window.innerWidth >= 992;
    }

    const onMenuItemClick = (event) => {
        if (!event.item.items) {
            setOverlayMenuActive(false);
            setMobileMenuActive(false);
        }
    }

    const onMobileTopbarMenuClick = (event) => {
        mobileTopbarMenuClick = true;
        setMobileTopbarMenuActive((prevState) => !prevState);
        event.preventDefault();
    }

    const onMobileSubTopbarMenuClick = (event) => {
        mobileTopbarMenuClick = true;

        event.preventDefault();
    }

    const onToggleMenuClick = (event) => {
        menuClick = true;

        if (isDesktop()) {
            if (layoutMode === 'overlay') {
                if (mobileMenuActive === true) {
                    setOverlayMenuActive(true);
                }

                setOverlayMenuActive((prevState) => !prevState);
                setMobileMenuActive(false);
            }
            else if (layoutMode === 'static') {
                setStaticMenuInactive((prevState) => !prevState);
            }
        }
        else {
            setMobileMenuActive((prevState) => !prevState);
        }

        event.preventDefault();
    }

    const wrapperClass = classNames('layout-wrapper', {
        'layout-overlay': layoutMode === 'overlay',
        'layout-static': layoutMode === 'static',
        'layout-static-sidebar-inactive': staticMenuInactive && layoutMode === 'static',
        'layout-overlay-sidebar-active': overlayMenuActive && layoutMode === 'overlay',
        'layout-mobile-sidebar-active': mobileMenuActive,
        'p-input-filled': inputStyle === 'filled',
        'p-ripple-disabled': ripple === false,
        'layout-theme-light': layoutColorMode === 'light'
    });

    return (
        <div className={wrapperClass} onClick={onWrapperClick} style={styles.body} >
            <Toast ref={toast} />
            <Tooltip ref={copyTooltipRef} target=".block-action-copy" position="bottom" content="Copied to clipboard" event="focus" />
            <AppTopbar onToggleMenuClick={onToggleMenuClick} layoutColorMode={layoutColorMode}
                mobileTopbarMenuActive={mobileTopbarMenuActive} onMobileTopbarMenuClick={onMobileTopbarMenuClick} onMobileSubTopbarMenuClick={onMobileSubTopbarMenuClick} />

            <div className="layout-sidebar" onClick={onSidebarClick} >
                <div align="center"><img src={Imagen()} alt="hyper" height={160} className="mb-4" /></div>
                <AppMenu model={menu} onMenuItemClick={onMenuItemClick} layoutColorMode={layoutColorMode} />
            </div>

            <div className="layout-main-container">
                <div className="container">
                    <Outlet />
                </div>
                <AppFooter />
            </div>
            {/* <CSSTransition classNames="layout-mask" timeout={{ enter: 200, exit: 200 }} in={mobileMenuActive} unmountOnExit>
                <div className="layout-mask p-component-overlay"></div>
            </CSSTransition> */}

        </div>
    );
}

export default Menu;