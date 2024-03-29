import React, { useState, useEffect, useRef } from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';

import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Divider } from 'primereact/divider';
import { Dropdown } from "primereact/dropdown";
import { environment } from "../components/baseUrl";

export const Flagrantes = () => {

    let empty = {
        id: null,
        nombre: '',
        documento: '',
        genero:'',
        nacionalidad:'',
        situacionJuridica: '',
        sentencia: '',
        descripcion:'',
        latitud: '',
        longitud: '',
        usuarioRegistro: '',
        fecRegistro: null,
        estadoFlagrante: '',
        estado: true
    };

    const state = [
        "Ministerio Publico",
        "Poder Judicial",
        "Finalizado",
    ];

    const baseUrl = environment.baseUrl + "flagrancia/";
    const [data, setData] = useState(null);


    const [productDialog, setProductDialog] = useState(false);
    const [deleteProductDialog, setDeleteProductDialog] = useState(false);
    const [product, setProduct] = useState(empty);
    const [selectedProducts, setSelectedProducts] = useState(null);
    const [submitted, setSubmitted] = useState(false);
    const [globalFilter, setGlobalFilter] = useState(null);
    const toast = useRef(null);
    const dt = useRef(null);

    const peticionGet = async () => {
        await axios.get(baseUrl)
            .then(response => {
                setData(response.data);
            }).catch(error => {
                console.log(error);
            })
    }

    // const peticionPost = async () => {
    //     delete product.id;
    //     await axios.post(baseUrl, product)
    //         .then(response => {
    //             setData(data.concat(response.data));
    //         }).catch(error => {
    //             console.log(error);
    //         })
    // }

    const peticionPut = async () => {
        await axios.put(baseUrl + product.id, product)
            .then(response => {
                var dataNueva = data;
                dataNueva.map(u => {
                    if (u.id === product.id) {
                        u.nombre = product.nombre;
                        u.direccion = product.direccion;
                    }
                });
                setData(dataNueva);
            }).catch(error => {
                console.log(error);
            })
    }

    useEffect(() => {
        peticionGet()
    }, []);

    const hideDialog = () => {
        setSubmitted(false);
        setProductDialog(false);
    }

    const hideDeleteProductDialog = () => {
        setDeleteProductDialog(false);
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
                toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Deteneido Modificado', life: 3000 });
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
        window.open("https://www.google.es/maps?q="+product.latitud+","+product.longitud);
        // setProduct(product);
        // setDeleteProductDialog(true);
    }

    const deleteProduct = () => {
        let _products = data.filter(val => val.id !== product.id);
        setData(_products);
        setDeleteProductDialog(false);
        setProduct(empty);
        toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Product Deleted', life: 3000 });
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

    const estadoBodyTemplate = (rowData) => {
        return (
            <>
                {/* <span className="p-column-title">documento</span> */}
                {rowData.estadoFlagrante}
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
                <Button icon="pi pi-map-marker" className="p-button-rounded p-button-outlined p-button-warning mr-2" onClick={() => confirmDeleteProduct(rowData)} />
                <Link to={`/timeline/${rowData.id}`} className="p-button-rounded p-button-outlined p-button" >TimeLine</Link>
            </div>
        );
    }

    const header = (
        <div className="flex flex-column md:flex-row md:justify-content-between md:align-items-center">
            <h5 className="m-0">Configuracion de Detenidos</h5>
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
    const deleteProductDialogFooter = (
        <>
            <Button label="No" icon="pi pi-times" className="p-button-text" onClick={hideDeleteProductDialog} />
            <Button label="Yes" icon="pi pi-check" className="p-button-text" onClick={deleteProduct} />
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
                        currentPageReportTemplate="Ver {first} a {last} de {totalRecords} Detenidos"
                        globalFilter={globalFilter} emptyMessage="No existen registros." header={header}>
                        <Column field="id" header="Codigo" sortable body={idBodyTemplate}></Column>
                        <Column field="nombre" header="Nombre" sortable body={nombreBodyTemplate}></Column>
                        <Column field="documento" header="Documento" sortable body={documentoBodyTemplate}></Column>
                        <Column field="estado" header="Estado" sortable body={estadoBodyTemplate}></Column>
                        <Column field="fecRegistro" header="Fecha de Ingreso" sortable body={fechaBodyTemplate}></Column>
                        <Column body={actionBodyTemplate}></Column>
                    </DataTable>

                    <Dialog visible={productDialog} style={{ width: '600px' }} header="Datos del Detenido" modal className="p-fluid" footer={productDialogFooter} onHide={hideDialog}>
                        <div className="grid">
                            <div className="field col">
                                <div className="field col">
                                    <div className="field">
                                        <label htmlFor="name">Nombre</label>
                                        <InputText id="nombre" name="nombre" value={product.nombre} onChange={(e) => onInputChange(e, 'nombre')} required disabled />
                                    </div>
                                    <div className="field">
                                        <label htmlFor="documento">N° Identidad</label>
                                        <InputText id="documento" value={product.documento} onChange={(e) => onInputChange(e, 'documento')} required disabled />
                                    </div>
                                    <div className="field">
                                        <label htmlFor="estado">Estado</label>
                                        <Dropdown id="estado" options={state} value={product.estadoFlagrante} onChange={(e) => onInputChange(e, 'estadoFlagrante')} />
                                    </div>
                                </div>
                            </div>
                            <div className="col-1">
                                <Divider layout="vertical">
                                </Divider>
                            </div>
                            <div className="field col">
                                <div className="field col">
                                    <label htmlFor="situacionJuridica">Situacion Juridica</label>
                                    <Dropdown id="situacionJuridica" options={state} value={product.situacionJuridica} onChange={(e) => onInputChange(e, 'situacionJuridica')} />
                                </div>
                                <div className="field col">
                                    <label htmlFor="sentencia">Sentencia</label>
                                    <Dropdown id="sentencia" options={state} value={product.sentencia} onChange={(e) => onInputChange(e, 'sentencia')} />
                                </div>
                            </div>
                        </div>


                    </Dialog>

                    <Dialog visible={deleteProductDialog} style={{ width: '450px' }} header="Confirm" modal footer={deleteProductDialogFooter} onHide={hideDeleteProductDialog}>
                        <div className="flex align-items-center justify-content-center">
                            <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                            {product && <span>Esta seguro de deshabilitar la sede <b>{product.nombre}</b>?</span>}
                        </div>
                    </Dialog>
                </div>
            </div>
        </div>
    );
}

export default Flagrantes;
