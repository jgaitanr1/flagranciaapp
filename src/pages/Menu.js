import React, { useEffect, useState, useRef } from 'react';
import { useNavigate, Outlet } from 'react-router-dom';
import Cookies from 'universal-cookie';
import classNames from 'classnames';
import PrimeReact from 'primereact/api';
import { Tooltip } from 'primereact/tooltip';

import { AppFooter } from '../AppFooter';
import { AppTopbar } from '../AppTopbar';
import { AppMenu } from '../AppMenu';
// import { CSSTransition } from 'react-transition-group';

const Menu = () => {
    const cookies = new Cookies();
    let navigate = useNavigate();
    let menuClick = false;
    let mobileTopbarMenuClick = false;
    PrimeReact.ripple = true;

    const copyTooltipRef = useRef();

    const pnp = [{
        label: 'Policia Nacional', icon: 'pi pi-fw pi-clone',
        items: [
            { label: 'Ingreso a Sede', icon: 'pi pi-fw pi-map-marker', to: 'ingresoPNP' },
            { label: 'Validar Flagrante', icon: 'pi pi-fw pi-id-card', to: 'validarPNP' }
        ]
    }]

    const patrulla = [{
        label: 'Policia Nacional', icon: 'pi pi-fw pi-clone',
        items: [
            { label: 'Registro', icon: 'pi pi-fw pi-user-edit', to: 'registro' }
        ]
    }]

    const mp = [{
        label: 'Ministerio Publico', icon: 'pi pi-fw pi-clone',
        items: [
            { label: 'Lista de Flagrantes', icon: 'pi pi-fw pi-pencil', to: 'flagrantesMP' }
        ]
    }]

    const pj = [{
        label: 'Poder Judicial', icon: 'pi pi-fw pi-clone',
        items: [
            { label: 'Lista de Flagrantes', icon: 'pi pi-fw pi-pencil', to: 'flagrantesPJ' }
        ]
    }]

    const adm = [{
        label: 'Favoritos',
        items: [
            { label: 'Inicio', icon: 'pi pi-fw pi-home', to: 'tarjetaDerechos' },
            { label: 'Lista de Flagrantes', icon: 'pi pi-fw pi-pencil', to: 'flagrantes' }
        ]
    },
    {
        label: 'Policia Nacional', icon: 'pi pi-fw pi-clone',
        items: [
            { label: 'Registro', icon: 'pi pi-fw pi-user-edit', to: 'registro' },
            { label: 'Ingreso a Sede', icon: 'pi pi-fw pi-map-marker', to: 'ingresoPNP' },
            { label: 'Validar Flagrante', icon: 'pi pi-fw pi-id-card', to: 'validarPNP' }
        ]
    },
    {
        label: 'Ministerio Publico', icon: 'pi pi-fw pi-clone',
        items: [
            { label: 'Lista de Flagrantes', icon: 'pi pi-fw pi-pencil', to: 'flagrantesMP' }
        ]
    },
    {
        label: 'Poder Judicial', icon: 'pi pi-fw pi-clone',
        items: [
            { label: 'Lista de Flagrantes', icon: 'pi pi-fw pi-pencil', to: 'flagrantesPJ' }
        ]
    }]

    function Acceder() {
        if (cookies.get('depNombre') === 'Poder Judicial' ){
          return pj;
        }else if(cookies.get('depNombre') === 'Policia Nacional del Peru'){
            return pnp;
        }else if(cookies.get('depNombre') === 'Ministerio Publico'){
            return mp;
        }else if(cookies.get('depNombre') === 'Policia Nacional del Peru - IR'){
            return patrulla;
        }else{
            return adm;
        }
      }

    
    const menu = Acceder();

    const [layoutMode, setLayoutMode] = useState('static');
    const [layoutColorMode, setLayoutColorMode] = useState('light');
    const [inputStyle, setInputStyle] = useState('outlined');
    const [ripple, setRipple] = useState(true);
    const [staticMenuInactive, setStaticMenuInactive] = useState(false);
    const [overlayMenuActive, setOverlayMenuActive] = useState(false);
    const [mobileMenuActive, setMobileMenuActive] = useState(false);
    const [mobileTopbarMenuActive, setMobileTopbarMenuActive] = useState(false);


    useEffect(() => {
        if (!cookies.get('id')) {
            navigate('/login');
        }
        document.documentElement.style.fontSize = 13 + 'px';
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
        <div className={wrapperClass} onClick={onWrapperClick} >
            <Tooltip ref={copyTooltipRef} target=".block-action-copy" position="bottom" content="Copied to clipboard" event="focus" />
            <AppTopbar onToggleMenuClick={onToggleMenuClick} layoutColorMode={layoutColorMode}
                mobileTopbarMenuActive={mobileTopbarMenuActive} onMobileTopbarMenuClick={onMobileTopbarMenuClick} onMobileSubTopbarMenuClick={onMobileSubTopbarMenuClick} />

            <div className="layout-sidebar" onClick={onSidebarClick}>
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