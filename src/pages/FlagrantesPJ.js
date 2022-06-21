import React, { useState, useEffect, useRef } from 'react';
// import { Link } from "react-router-dom";
import axios from 'axios';
import Cookies from 'universal-cookie';

import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { Divider } from 'primereact/divider';
import { Dropdown } from "primereact/dropdown";
import { environment } from "../components/baseUrl";

export const FlagrantesPJ = () => {
    const cookies = new Cookies();

    let empty = {
        id: null,
        nombre: '',
        documento: '',
        situacionJuridica: '',
        sentencia: '',
        sentenciaDET: '',
        audiencia: '',
        acusacion: '',
        descripcion: '',
        tipoArresto: '',
        latitud: '',
        longitud: '',
        usuarioRegistro: '',
        fecRegistro: null,
        estadoFlagrante: '',
        estado: true
    };

    let dempty = {
        id: null,
        descripcion: '',
        dependencia: '',
        usuarioRegistro: '',
        fecRegistro: null,
        idFlagrancia: null
    };

    const state = [
        "Prisión",
        "Trabajo Social",
        "Multa Economica"
    ];

    const baseUrl = environment.baseUrl + "flagrancia/";
    const [data, setData] = useState(null);


    const [productDialog, setProductDialog] = useState(false);
    const [product, setProduct] = useState(empty);
    const [dproduct, setDProduct] = useState(dempty);
    const [selectedProducts, setSelectedProducts] = useState(null);
    const [deleteProductDialog, setDeleteProductDialog] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [globalFilter, setGlobalFilter] = useState(null);
    const toast = useRef(null);
    const dt = useRef(null);


    const peticionGet = async () => {
        await axios.get(baseUrl + "pj/")
            .then(response => {
                setData(response.data);
            }).catch(error => {
                console.log(error);
            })
    }

    const peticionPost = async () => {
        let date = new Date();
        delete dproduct.id;
        dproduct.descripcion = "Se resolvio por parte de " + cookies.get('depNombre') +
            " otorgar al Sr.(a) " + product.nombre + " la sentencia de: " +
            product.sentencia + " con detalle " + product.sentenciaDET +
            " de tal manera que informa para los fines que sean requeridos.";
        dproduct.fecRegistro = date.toLocaleString();
        dproduct.usuarioRegistro = cookies.get('username');
        dproduct.dependencia = cookies.get('depNombre');
        dproduct.idFlagrancia = product.id;
        await axios.post(environment.baseUrl + "dflagrancia/", dproduct);
    }

    const peticionPostResuelto = async () => {
        let date = new Date();
        delete dproduct.id;
        dproduct.descripcion = "Se da por resuelta la situacion del Sr.(a) " + product.nombre + " al otorgar: " +
            product.situacionJuridica + " por principio de " + product.descripcion +
            " de tal manera se cierra este caso con dicha informacion.";
        dproduct.fecRegistro = date.toLocaleString();
        dproduct.usuarioRegistro = cookies.get('username');
        dproduct.dependencia = 'Sistema de Flagrancia';
        dproduct.idFlagrancia = product.id;
        await axios.post(environment.baseUrl + "dflagrancia/", dproduct);
    }

    const peticionPut = async () => {
        await axios.put(baseUrl + product.id, product)
            .then(response => {
                var dataNueva = data;
                dataNueva.map(u => {
                    if (u.id === product.id) {
                        u.nombre = product.nombre;
                        u.documento = product.documento;
                        u.situacionJuridica = product.situacionJuridica;
                        u.sentencia = product.sentencia;
                        u.sentenciaDET = product.sentenciaDET;
                        u.audiencia = product.audiencia;
                        u.acusacion = product.acusacion;
                        u.descripcion = product.descripcion;
                        u.latitud = product.latitud;
                        u.longitud = product.longitud;
                        u.usuarioRegistro = product.usuarioRegistro;
                        u.fecRegistro = product.fecRegistro;
                        u.estadoFlagrante = product.estadoFlagrante;
                        u.estado = product.estado;
                    }
                });
                setData(dataNueva);
            }).catch(error => {
                console.log(error);
            })
    }

    const peticionPutEstado = async () => {
        product.estadoFlagrante = 'Resuelto';
        await axios.put(baseUrl + product.id, product);
    }

    useEffect(() => {
        peticionGet()
    }, []);

    const hideDialog = () => {
        setSubmitted(false);
        setProductDialog(false);
    }

    const saveProduct = () => {
        setSubmitted(true);

        if (product.nombre.trim()) {
            let _products = [...data];
            let _product = { ...product };
            if (product.id) {
                const index = findIndexById(product.id);
                _products[index] = _product;
                peticionPut();
                toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Detenido Modificado', life: 3000 });
                setTimeout(() => {
                    peticionPost();
                }, 1500);
                setProductDialog(false);
            }
            setData(_products);
            setProduct(empty);
        }
    }

    const editProduct = (product) => {
        setProduct({ ...product });
        setProductDialog(true);
    }

    const confirmDeleteProduct = (product) => {
        setProduct(product);
        setDeleteProductDialog(true);
    }

    const hideDeleteProductDialog = () => {
        setDeleteProductDialog(false);
    }

    const deleteProduct = () => {
        let _products = data.filter(val => val.id !== product.id);
        setData(_products);
        setDeleteProductDialog(false);
        setProduct(empty);
        toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Completado', life: 4000 });
        setTimeout(() => {
            peticionPutEstado();
        }, 1000);
        setTimeout(() => {
            peticionPostResuelto();
        }, 1000);
    }

    const deleteProductDialogFooter = (
        <>
            <Button label="No" icon="pi pi-times" className="p-button-text" onClick={hideDeleteProductDialog} />
            <Button label="Si" icon="pi pi-check" className="p-button-text" onClick={deleteProduct} />
        </>
    );

    const findIndexById = (id) => {
        let index = -1;
        for (let i = 0; i < data.length; i++) {
            if (data[i].id === id) {
                index = i;
                break;
            }
        }

        return index;
    }

    const onInputChange = (e, name) => {
        const val = (e.target && e.target.value) || '';
        let _product = { ...product };
        _product[`${name}`] = val;
        setProduct(_product);
        console.log(product);
    }

    const googleMapsProduct = (product) => {
        window.open("https://www.google.es/maps?q=" + product.latitud + "," + product.longitud);
    }

    const idBodyTemplate = (rowData) => {
        return (
            <>
                {/* <span className="p-column-title">id</span> */}
                {rowData.id}
            </>
        );
    }

    const nombreBodyTemplate = (rowData) => {
        return (
            <>
                {/* <span className="p-column-title">nombre</span> */}
                {rowData.nombre}
            </>
        );
    }

    const documentoBodyTemplate = (rowData) => {
        return (
            <>
                {/* <span className="p-column-title">documento</span> */}
                {rowData.documento}
            </>
        );
    }

    // const estadoBodyTemplate = (rowData) => {
    //     return (
    //         <>
    //             {/* <span className="p-column-title">documento</span> */}
    //             {rowData.estadoFlagrante}
    //         </>
    //     );
    // }

    const fechaBodyTemplate = (rowData) => {
        var dt = rowData.fecRegistro;
        return (
            <>
                {/* <span className="p-column-title">fecha</span> */}
                {dt.toLocaleString()}
            </>
        );
    }

    const audienciaBodyTemplate = (rowData) => {
        let dato = "";
        if (rowData.audiencia === "") {
            dato = "Audiencia no programada"
        } else {
            dato = rowData.audiencia;
        }
        return (
            <>
                {/* <span className="p-column-title">documento</span> */}
                {dato}
            </>
        );
    }

    const actionBodyTemplate = (rowData) => {
        return (
            <div className="actions">
                {/* <Link to={`/timeline/${rowData.id}`} className="p-button-rounded p-button-outlined p-button mr-2" >Det.</Link>
                <Button icon="pi pi-map-marker" className="p-button-rounded p-button-outlined p-button-warning mr-2" onClick={() => googleMapsProduct(rowData)} /> */}
                <Button icon="pi pi-pencil" className="p-button-rounded p-button-outlined p-button-success mr-2" onClick={() => editProduct(rowData)} />
                <Button icon="pi pi-check" className="p-button-rounded p-button-outlined p-button mr-2" onClick={() => confirmDeleteProduct(rowData)} />
            </div>
        );
    }

    const header = (
        <div className="flex flex-column md:flex-row md:justify-content-between md:align-items-center">
            <h5 className="m-0">Lista de Flagrantes</h5>
            <span className="block mt-2 md:mt-0 p-input-icon-left">
                <i className="pi pi-search" />
                <InputText type="search" onInput={(e) => setGlobalFilter(e.target.value)} placeholder="Buscar..." />
            </span>
        </div>
    );

    const productDialogFooter = (
        <>
            <Button label="Cancelar" icon="pi pi-times" className="p-button-text" onClick={hideDialog} />
            <Button label="Guardar" icon="pi pi-check" className="p-button-text" onClick={saveProduct} />
        </>
    );
    // const deleteProductDialogFooter = (
    //     <>
    //         <Button label="No" icon="pi pi-times" className="p-button-text" onClick={hideDeleteProductDialog} />
    //         <Button label="Yes" icon="pi pi-check" className="p-button-text" onClick={deleteProduct} />
    //     </>
    // );

    return (
        <div className="grid crud-demo">
            <div className="col-12">
                <div className="card">
                    <Toast ref={toast} />
                    <DataTable ref={dt} value={data} selection={selectedProducts} onSelectionChange={(e) => setSelectedProducts(e.value)}
                        dataKey="id" paginator rows={10} rowsPerPageOptions={[5, 10, 25]} className="datatable-responsive"
                        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                        currentPageReportTemplate="Ver {first} a {last} de {totalRecords} Detenidos"
                        globalFilter={globalFilter} emptyMessage="No existen registros." header={header}>
                        <Column field="id" header="Codigo" sortable body={idBodyTemplate}></Column>
                        <Column field="nombre" header="Nombre" sortable body={nombreBodyTemplate}></Column>
                        <Column field="documento" header="Documento" sortable body={documentoBodyTemplate}></Column>
                        <Column field="Audiencia" header="Fecha de Audiencia" sortable body={audienciaBodyTemplate}></Column>
                        <Column field="fecRegistro" header="Fecha de Ingreso" sortable body={fechaBodyTemplate}></Column>
                        <Column body={actionBodyTemplate}></Column>
                    </DataTable>

                    <Dialog visible={productDialog} style={{ width: '950px' }} header="Datos del Detenido" modal className="p-fluid" footer={productDialogFooter} onHide={hideDialog}>
                        <div className="grid">
                            <div className="field col">
                                <div className="formgrid grid">
                                    <div className="field col">
                                        <label htmlFor="name">Nombre</label>
                                        <InputText id="nombre" name="nombre" value={product.nombre} onChange={(e) => onInputChange(e, 'nombre')} required disabled />
                                    </div>
                                    <div className="field col">
                                        <label htmlFor="documento">N° Identidad</label>
                                        <InputText id="documento" value={product.documento} onChange={(e) => onInputChange(e, 'documento')} required disabled />
                                    </div>
                                </div>
                                <div className="formgrid grid">
                                    <div className="field col">
                                        <label htmlFor="name">Situacion Juridica</label>
                                        <InputText id="situacionJuridica" name="situacionJuridica" value={product.situacionJuridica} onChange={(e) => onInputChange(e, 'situacionJuridica')} required disabled />
                                    </div>
                                    <div className="field col">
                                        <label htmlFor="descripcion">Detalle SJ</label>
                                        <InputText id="-descripcion" value={product.descripcion} onChange={(e) => onInputChange(e, 'descripcion')} required disabled />
                                    </div>
                                </div>
                                <div className="formgrid grid">
                                    <div className="field col">
                                        <label htmlFor="tipoArresto">Tipo de Arresto</label>
                                        <InputText id="tipoArresto" name="tipoArresto" value={product.tipoArresto} onChange={(e) => onInputChange(e, 'tipoArresto')} required disabled />
                                    </div>
                                    <div className="field col">
                                        <label htmlFor="fecRegistro">Fecha de Registro</label>
                                        <InputText id="-fecRegistro" value={product.fecRegistro} onChange={(e) => onInputChange(e, 'fecRegistro')} required disabled />
                                    </div>
                                </div>
                                <div className="field col">
                                    <div className="field">
                                        <label htmlFor="acusacion">Acusación Fiscal</label>
                                        <InputTextarea id="-acusacion" value={product.acusacion} onChange={(e) => onInputChange(e, 'acusacion')} required disabled />
                                    </div>
                                </div>
                            </div>
                            <div className="col-1">
                                <Divider layout="vertical">
                                </Divider>
                            </div>
                            <div className="field col-4">
                                <div className="field col">
                                    <label htmlFor="sentencia">Sentencia</label>
                                    <Dropdown id="sentencia" options={state} value={product.sentencia} onChange={(e) => onInputChange(e, 'sentencia')} required />
                                </div>
                                <div className="field col">
                                    <label htmlFor="sentenciaDET">Detalle: </label>
                                    <InputTextarea id="sentenciaDET" value={product.sentenciaDET} onChange={(e) => onInputChange(e, 'sentenciaDET')} required />
                                </div>
                            </div>
                        </div>

                    </Dialog>

                    <Dialog visible={deleteProductDialog} style={{ width: '450px' }} header="Confirmar" modal footer={deleteProductDialogFooter} onHide={hideDeleteProductDialog}>
                        <div className="flex align-items-center justify-content-center">
                            <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                            {product && <span>Desea dar por finalizado el proceso del Sr.@ <b>{product.nombre}</b></span>}
                        </div>
                    </Dialog>
                </div>
            </div>
        </div>
    );
}

export default FlagrantesPJ;
