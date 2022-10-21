import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import Cookies from 'universal-cookie';

import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button';
import { Dropdown } from "primereact/dropdown";
import { InputTextarea } from 'primereact/inputtextarea';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { environment } from '../components/baseUrl';

import { Message } from 'primereact/message';

export const ValidarPNP = () => {

    const cookies = new Cookies();

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
        observaciones: '',
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

    const tipodocumento = [
        "Documento Nacional de Identidad",
        "Carnet de Extranjeria"
    ];

    const tipogenero = [
        "Masculino",
        "Femenino",
        "Otros"
    ];

    const baseUrl = environment.baseUrl + "flagrancia/";
    const [data, setData] = useState(null);


    const [productDialog, setProductDialog] = useState(false);
    const [product, setProduct] = useState(empty);
    const [dproduct, setDProduct] = useState(dempty);
    const [selectedProducts, setSelectedProducts] = useState(null);
    const [submitted, setSubmitted] = useState(false);
    const [globalFilter, setGlobalFilter] = useState(null);
    const [radioValue, setRadioValue] = useState(null);
    const toast = useRef(null);
    const dt = useRef(null);

    const peticionGet = async () => {
        await axios.get(baseUrl + 'ingresado/')
            .then(response => {
                setData(response.data);
            }).catch(error => {
                console.log(error);
            })
    }

    const peticionPost = async () => {
        let date = new Date();
        delete dproduct.id;
        dproduct.descripcion = "Se Validaron los datos del detenido, Nombre: " + product.nombre + " N° Identificacion: " +
            product.documento + ", Se procedio a dar por finalizada la intervencion de la PNP.";
        dproduct.fecRegistro = date.toLocaleString();
        dproduct.usuarioRegistro = cookies.get('username');
        dproduct.dependencia = cookies.get('depNombre');
        dproduct.idFlagrancia = product.id;
        await axios.post(environment.baseUrl + "dflagrancia/", dproduct);
    }

    const peticionPut = async () => {
        product.estadoFlagrante = 'Identificado';
        await axios.put(baseUrl + product.id, product)
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
                toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Cambio Realizado', life: 3000 });
                peticionPost();
                _products = data.filter(val => val.id !== product.id);
                setData(_products);
                setProductDialog(false);
                setProduct(empty);
            }
            setData(_products);
            setProduct(empty);
        }
    }

    const editProduct = (product) => {
        setProduct({ ...product });
        setProductDialog(true);
    }

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
        console.log(product);
        setRadioValue(e.value);
        setProduct(_product);
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

    const fechaBodyTemplate = (rowData) => {
        var dt = rowData.fecRegistro;

        return (
            <>
                {/* <span className="p-column-title">fecha</span> */}
                {dt.toLocaleString()}
            </>
        );
    }

    const actionBodyTemplate = (rowData) => {
        return (
            <div className="actions">
                <Button icon="pi pi-pencil" className="p-button-rounded p-button-outlined p-button-success mr-2" onClick={() => editProduct(rowData)} />
                {/* <Button icon="pi pi-map-marker" className="p-button-rounded p-button-outlined p-button-warning mr-2" onClick={() => confirmDeleteProduct(rowData)} /> */}
                {/* <Button icon="pi pi-image" className="p-button-rounded p-button-outlined p-button" /> */}
            </div>
        );
    }

    const header = (
        <div className="flex flex-column md:flex-row md:justify-content-between md:align-items-center">
            <h5 className="m-0">Lista de Detenidos</h5>
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

    return (
        <div className="grid crud-demo">
            <div className="col-12">
                <div className="card">
                    <Toast ref={toast} />
                    <DataTable ref={dt} value={data} selection={selectedProducts} onSelectionChange={(e) => setSelectedProducts(e.value)}
                        dataKey="id" paginator rows={10} rowsPerPageOptions={[5, 10, 25]} className="datatable-responsive"
                        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                        currentPageReportTemplate="Ver {first} a {last} de {totalRecords} Sedes"
                        globalFilter={globalFilter} emptyMessage="No existen registros." header={header}>
                        <Column field="id" header="Codigo Unico" sortable body={idBodyTemplate}></Column>
                        <Column field="nombre" header="Nombre" sortable body={nombreBodyTemplate}></Column>
                        <Column field="documento" header="Documento" sortable body={documentoBodyTemplate}></Column>
                        <Column field="fecRegistro" header="Fecha de Ingreso" sortable body={fechaBodyTemplate}></Column>
                        <Column body={actionBodyTemplate}></Column>
                    </DataTable>

                    <Dialog visible={productDialog} style={{ width: '600px' }} header="Datos del detenido" modal className="p-fluid" footer={productDialogFooter} onHide={hideDialog}>
                        <Message severity="error" text="Recuerda que al GUARDAR el Detenido ya no podra ser modificado por la PNP y sera enviado al Ministerio Publico" />
                        <br />
                        <div className="field">
                            <label htmlFor="name">Nombre Detenido</label>
                            <InputText id="nombre" name="nombre" value={product.nombre} onChange={(e) => onInputChange(e, 'nombre')} required autoFocus />
                        </div>
                        <div className="formgrid grid">
                            <div className="field col">
                                <label htmlFor="tDocumento">Tipo de Documento</label>
                                <Dropdown id="tDocumento" options={tipodocumento} value={product.tDocumento} onChange={(e) => onInputChange(e, 'tDocumento')} required />
                            </div>
                            <div className="field col">
                                <label htmlFor="documento">Nro Documento</label>
                                <InputText id="documento" name="documento" value={product.documento} onChange={(e) => onInputChange(e, 'documento')} required />
                            </div>
                        </div>
                        <div className="field">
                            <label htmlFor="observaciones">Detalle: </label>
                            <InputTextarea id="observaciones" value={product.observaciones} onChange={(e) => onInputChange(e, 'observaciones')} required />
                        </div>
                        <div className="field">
                            <label htmlFor="genero" className='mb-3'>Ingresar Genero</label>
                            <Dropdown id="genero" options={tipogenero} value={product.genero} onChange={(e) => onInputChange(e, 'genero')} required />
                        </div>

                    </Dialog>

                </div>
            </div>
        </div>
    );
}

export default ValidarPNP;
