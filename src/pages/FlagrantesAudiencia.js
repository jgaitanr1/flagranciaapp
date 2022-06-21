import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import Cookies from 'universal-cookie';

import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { InputNumber } from 'primereact/inputnumber';
import { Calendar } from 'primereact/calendar';
import { Message } from 'primereact/message';
import { environment } from "../components/baseUrl";

export const FlagrantesPJ = () => {
    const cookies = new Cookies();

    let empty = {
        id: null,
        nombre: '',
        documento: '',
        situacionJuridica: '',
        sentencia: '',
        audiencia: '',
        acusacion: '',
        descripcion: '',
        latitud: '',
        altitud: '',
        usuarioRegistro: '',
        fecRegistro: null,
        estadoFlagrante: '',
        estado: true,
        fec: '',
        hour: '',
        min: '',
        ampm: ''
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
    let date = new Date();

    const [productDialog, setProductDialog] = useState(false);
    const [product, setProduct] = useState(empty);
    const [dproduct, setDProduct] = useState(dempty);
    const [selectedProducts, setSelectedProducts] = useState(null);
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
        delete dproduct.id;
        dproduct.descripcion = "Se ingreso la fecha de audiencia " + product.fec.toLocaleDateString() +
            " en el horario"+ product.hour+":"+product.min +" al Sr.(a) " + product.nombre
             + " por el usuario "+cookies.get('username') +" de la dependencia "+cookies.get('depNombre')
             + " se informa de ello mediante este comunicado";
        dproduct.fecRegistro = date.toLocaleString();
        dproduct.usuarioRegistro = cookies.get('username');
        dproduct.dependencia = cookies.get('depNombre');
        dproduct.idFlagrancia = product.id;
        await axios.post(environment.baseUrl + "dflagrancia/", dproduct);
    }


    const peticionPut = async () => {
        product.audiencia = product.fec.toLocaleDateString()+", "+product.hour+":"+product.min;
        await axios.put(baseUrl + product.id, product)
            .then(response => {
                var dataNueva = data;
                dataNueva.map(u => {
                    if (u.id === product.id) {
                        u.nombre = product.nombre;
                        u.documento = product.documento;
                        u.situacionJuridica = product.situacionJuridica;
                        u.sentencia = product.sentencia;
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
                <Button icon="pi pi-calendar" className="p-button-rounded p-button-outlined p-button-success mr-2" onClick={() => editProduct(rowData)} />
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

                    <Dialog visible={productDialog} style={{ width: '500px' }} header="Datos del Detenido" modal className="p-fluid" footer={productDialogFooter} onHide={hideDialog}>
                        <Message severity="success" text="Recuerda Seleccionar la fecha y hora correspondiente, en caso de error o reprogramación podrás editar esta sección." />
                        <br />
                        <Message severity="success" text="Es necesario utilizar el formato de 24h para ingresar las horas y minutos. "/>
                        <br />
                        <div className="grid">
                            <div className="field col">
                                <div className="field">
                                    <label htmlFor="fec">Fecha de Audiencia</label>
                                    <Calendar minDate={date} showIcon showButtonBar value={product.fec} onChange={(e) => onInputChange(e, 'fec')}></Calendar>
                                </div>
                                <div className="formgrid grid">
                                    <div className="field col">
                                        <label htmlFor="hour">Hora</label>
                                        <InputNumber min={0} max={23} value={product.hour} onValueChange={(e) => onInputChange(e, 'hour')} showButtons ></InputNumber>
                                    </div>
                                    <div className="field col">
                                        <label htmlFor="min">Minutos</label>
                                        <InputNumber min={0} max={59} value={product.min} onValueChange={(e) => onInputChange(e, 'min')} showButtons ></InputNumber>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Dialog>
                </div>
            </div>
        </div>
    );
}

export default FlagrantesPJ;
