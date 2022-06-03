import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import Cookies from 'universal-cookie';

import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button';
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
        situacionJuridica: '',
        sentencia: '',
        latitud: '',
        altitud: '',
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

    const baseUrl = environment.baseUrl + "flagrancia/";
    const [data, setData] = useState(null);


    const [productDialog, setProductDialog] = useState(false);
    const [product, setProduct] = useState(empty);
    const [dproduct, setDProduct] = useState(dempty);
    const [selectedProducts, setSelectedProducts] = useState(null);
    const [submitted, setSubmitted] = useState(false);
    const [globalFilter, setGlobalFilter] = useState(null);
    const toast = useRef(null);
    const dt = useRef(null);

    const peticionGet = async () => {
        await axios.get(baseUrl+'ingresado/')
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
                                product.documento +", Se procedio a dar por finalizada la intervencion de la PNP.";
        dproduct.fecRegistro = date.toLocaleString();
        dproduct.usuarioRegistro = cookies.get('username');
        dproduct.dependencia = cookies.get('depNombre');
        dproduct.idFlagrancia = product.id;
        await axios.post(environment.baseUrl + "dflagrancia/", dproduct)
        // .then(response => {
        //     setData(data.concat(response.data));
        // }).catch(error => {
        //     console.log(error);
        // })
    }

    const peticionPut = async () => {
        product.estadoFlagrante = 'Ministerio Publico';
        await axios.put(baseUrl + product.id, product)
            // .then(response => {
            //     var dataNueva = data;
            //     dataNueva.map(u => {
            //         if (u.id === product.id) {
            //             u.nombre = product.nombre;
            //             u.documento = product.documento;
            //             u.situacionJuridica = product.situacionJuridica;
            //             u.sentencia = product.sentencia;
            //             u.estadoFlagrante = product.estadoFlagrante;
            //             u.estado = product.estado;
            //         }
            //     });
            //     setData(dataNueva);
            // }).catch(error => {
            //     console.log(error);
            // })
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
        peticionPost();
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
        setProduct(_product);
        console.log(product);
    }

    const idBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">id</span>
                {rowData.id}
            </>
        );
    }

    const nombreBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">nombre</span>
                {rowData.nombre}
            </>
        );
    }

    const documentoBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">documento</span>
                {rowData.documento}
            </>
        );
    }

    const fechaBodyTemplate = (rowData) => {
        var dt = rowData.fecRegistro;

        return (
            <>
                <span className="p-column-title">fecha</span>
                {dt.toLocaleString()}
            </>
        );
    }

    const actionBodyTemplate = (rowData) => {
        return (
            <div className="actions">
                <Button icon="pi pi-pencil" className="p-button-rounded p-button-outlined p-button-success mr-2" onClick={() => editProduct(rowData)} />
                {/* <Button icon="pi pi-image" className="p-button-rounded p-button-outlined p-button" /> */}
            </div>
        );
    }

    const header = (
        <div className="flex flex-column md:flex-row md:justify-content-between md:align-items-center">
            <h5 className="m-0">Lista de Flagrantes</h5>
            <span className="block mt-2 md:mt-0 p-input-icon-left">
                <i className="pi pi-search" />
                <InputText type="search" onInput={(e) => setGlobalFilter(e.target.value)} placeholder="Search..." />
            </span>
        </div>
    );

    const productDialogFooter = (
        <>
            <Button label="Cancel" icon="pi pi-times" className="p-button-text" onClick={hideDialog} />
            <Button label="Save" icon="pi pi-check" className="p-button-text" onClick={saveProduct} />
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

                    <Dialog visible={productDialog} style={{ width: '450px' }} header="Datos del detenido" modal className="p-fluid" footer={productDialogFooter} onHide={hideDialog}>
                        <Message severity="error" text="Recuerda que al ACEPTAR el Detenido ya no podra ser modificado por la PNP y sera enviado al Ministerio Publico" />
                        <br />
                        <div className="field">
                            <label htmlFor="name">Nombre Detenido</label>
                            <InputText id="nombre" name="nombre" value={product.nombre} onChange={(e) => onInputChange(e, 'nombre')} required autoFocus />
                        </div>
                        <div className="field">
                            <label htmlFor="documento">Documento del Detenido</label>
                            <InputText id="documento" name="documento" value={product.documento} onChange={(e) => onInputChange(e, 'documento')} required />
                        </div>
                    </Dialog>

                </div>
            </div>
        </div>
    );
}

export default ValidarPNP;
