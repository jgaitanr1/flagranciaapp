import React, { useState, useEffect, useRef } from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';

import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { environment } from "../components/baseUrl";

export const PendientePNP = () => {

    const baseUrl = environment.baseUrl + "flagrancia/pnp";
    const [data, setData] = useState(null);

    const [selectedProducts, setSelectedProducts] = useState(null);
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


    useEffect(() => {
        peticionGet()
    }, []);


    const confirmDeleteProduct = (product) => {
        window.open("https://www.google.es/maps?q="+product.latitud+","+product.longitud);
    }

    const idBodyTemplate = (rowData) => {
        return (
            <>
                {rowData.id}
            </>
        );
    }

    const nombreBodyTemplate = (rowData) => {
        return (
            <>
                {rowData.nombre}
            </>
        );
    }

    const documentoBodyTemplate = (rowData) => {
        return (
            <>
                {rowData.documento}
            </>
        );
    }

    const estadoBodyTemplate = (rowData) => {
        return (
            <>
                {rowData.estadoFlagrante}
            </>
        );
    }

    const fechaBodyTemplate = (rowData) => {
        var dt = rowData.fecRegistro;
        return (
            <>
                {dt.toLocaleString()}
            </>
        );
    }

    const actionBodyTemplate = (rowData) => {
        return (
            <div className="actions">
                <Button icon="pi pi-map-marker" className="p-button-rounded p-button-outlined p-button-warning mr-2" onClick={() => confirmDeleteProduct(rowData)} />
                <Link to={`/timeline/${rowData.id}`} className="p-button-rounded p-button-outlined p-button" >TimeLine</Link>
            </div>
        );
    }

    const header = (
        <div className="flex flex-column md:flex-row md:justify-content-between md:align-items-center">
            <h5 className="m-0">Configuracion de Flagrantes</h5>
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
                        <Column field="estado" header="Estado" sortable body={estadoBodyTemplate}></Column>
                        <Column field="fecRegistro" header="Fecha de Ingreso" sortable body={fechaBodyTemplate}></Column>
                        <Column body={actionBodyTemplate}></Column>
                    </DataTable>
                </div>
            </div>
        </div>
    );
}

export default PendientePNP;
