import React, { useState, useEffect, useRef } from 'react';
// import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'universal-cookie';

import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { environment } from '../components/baseUrl';

export const IngresoPNP = () => {

    const cookies = new Cookies();
    // let navigate = useNavigate();
    
    let empty = {
        id: null,
        nombre: '',
        documento: '',
        situacionJuridica: '',
        sentencia: '',
        audiencia: '',
        acusacion: '',
        descripcion:'',
        latitud: '',
        altitud: '',
        tipoArresto:'',
        usuarioRegistro: '',
        fecRegistro: null,
        estadoFlagrante: '',
        estado: true
    };

    let dempty = {
        id: null,
        descripcion: '',
        dependencia: '',
        fecRegistro: null,
        usuarioRegistro: '',
        idFlagrancia: null
    };

    const baseUrl = environment.baseUrl + "flagrancia/";
    const [data, setData] = useState(null);
   
    const [product, setProduct] = useState(empty);
    const [dproduct, setDProduct] = useState(dempty);
    const [selectedProducts, setSelectedProducts] = useState(null);
    const [globalFilter, setGlobalFilter] = useState(null);
    const [deleteProductDialog, setDeleteProductDialog] = useState(false);
    const toast = useRef(null);
    const dt = useRef(null);

    const peticionGet = async () => {
        await axios.get(baseUrl+'detenido/')
            .then(response => {
                setData(response.data);
            }).catch(error => {
                console.log(error);
            })
    }

    const peticionPost = async () => {
        delete dproduct.id;
        dproduct.descripcion = "Se registro el arresto "+product.tipoArresto+" del Sr.(a) "+product.nombre+" el que se ingreso a sistema con el usuario: "+
                                product.usuarioRegistro+", al encontrarse en hecho de Flagrancia por lo que se pone en conocimiento mediante este comunicado.";
        dproduct.dependencia = cookies.get('depNombre');
        dproduct.fecRegistro = product.fecRegistro;
        dproduct.usuarioRegistro = product.usuarioRegistro;
        dproduct.idFlagrancia = product.id;
        await axios.post(environment.baseUrl + "dflagrancia/", dproduct)
    }

    const peticionPostIngreso = async () => {
        let date = new Date();
        delete dproduct.id;
        dproduct.descripcion = "Se registro el ingreso del Sr(a). "+product.nombre+", con Documento: "+
                                product.documento+", En la sede de Flagrancia por el usuario: "+ cookies.get('username') +
                                ", a espera de la validacion de datos.";
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

    const peticionEstadoPut = async () => {
        await axios.put(baseUrl + product.id + '/ingresado', product)
            .then(response => {
                var dataNueva = data;
                dataNueva.map(u => {
                    if (u.id === product.id) {
                        u.nombre = product.nombre;
                        u.documento = product.documento;
                        u.situacionJuridica = product.situacionJuridica;
                        u.sentencia = product.sentencia;
                        u.estadoFlagrante = product.estadoFlagrante;
                        u.estado = product.estado;
                    }
                });
                // setData(dataNueva);
            }).catch(error => {
                console.log(error);
            })
    }

    useEffect(() => {
        peticionGet()
    }, []);

    

    // const findIndexById = (id) => {
    //     let index = -1;
    //     for (let i = 0; i < data.length; i++) {
    //         if (data[i].id === id) {
    //             index = i;
    //             break;
    //         }
    //     }

    //     return index;
    // }

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

    const hideDeleteProductDialog = () => {
        setDeleteProductDialog(false);
    }

    const deleteProduct = () => {
        let _products = data.filter(val => val.id !== product.id);
        setData(_products);
        setDeleteProductDialog(false);
        setProduct(empty);
        peticionPost();
        setTimeout(() => {
            peticionEstadoPut();
        }, 1500);
        toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Detenido Ingresado en Sede', life: 4000 });
        setTimeout(() => {
            peticionPostIngreso();
        }, 1000);
    }

    const confirmDeleteProduct = (product) => {
        setProduct(product);
        setDeleteProductDialog(true);
    }

    const deleteProductDialogFooter = (
        <>
            <Button label="No" icon="pi pi-times" className="p-button-text" onClick={hideDeleteProductDialog} />
            <Button label="Si" icon="pi pi-check" className="p-button-text" onClick={deleteProduct} />
        </>
    );

    const actionBodyTemplate = (rowData) => {
        return (
            <div className="actions">
                <Button icon="pi pi-check" className="p-button-rounded p-button-outlined p-button" onClick={() => confirmDeleteProduct(rowData)} />
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
                        <Column field="fecRegistro" header="Fecha de Ingreso" sortable body={fechaBodyTemplate}></Column>
                        <Column body={actionBodyTemplate}></Column>
                    </DataTable>

                    <Dialog visible={deleteProductDialog} style={{ width: '450px' }} header="Confirm" modal footer={deleteProductDialogFooter} onHide={hideDeleteProductDialog}>
                        <div className="flex align-items-center justify-content-center">
                            <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                            {product && <span>Confirme el Ingreso a Sede de <b>{product.nombre}</b></span>}
                        </div>
                    </Dialog>
                </div>
            </div>
        </div>
    );
}

export default IngresoPNP;
