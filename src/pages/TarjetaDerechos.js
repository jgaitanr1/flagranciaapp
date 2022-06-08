import React from 'react';

export const TarjetaDerechos = () => {
    return (
        <div className="surface-section px-4 py-8 md:px-6 lg:px-8 text-center">
            <div className="mb-3 font-bold text-2xl">
                <span className="text-900">Tarjeta de </span>
                <span className="text-red-600">Derechos</span>
            </div>
            <div className="text-700 text-sm mb-6">Artículo 71. Inciso 2. Código Procesal Penal.</div>
            <div className="grid">
                <div className="col-12 md:col-4 mb-4 px-5">
                    <span className="p-3 shadow-2 mb-3 inline-block surface-card" style={{ borderRadius: '10px' }}>
                        <i className="pi pi-question text-4xl text-red-500"></i>
                    </span>
                    <div className="text-900 mb-3 font-medium">Tiene derecho a:</div>
                    <span className="text-700 text-sm line-height-3">Conocer la causa de su detención.</span>
                </div>
                <div className="col-12 md:col-4 mb-4 px-5">
                    <span className="p-3 shadow-2 mb-3 inline-block surface-card" style={{ borderRadius: '10px' }}>
                        <i className="pi pi-users text-4xl text-red-500"></i>
                    </span>
                    <div className="text-900 mb-3 font-medium">Tiene derecho a:</div>
                    <span className="text-700 text-sm line-height-3">Designar a la persona o institución a la que debe comunicarse de inmediato su detención.</span>
                </div>
                <div className="col-12 md:col-4 mb-4 px-5">
                    <span className="p-3 shadow-2 mb-3 inline-block surface-card" style={{ borderRadius: '10px' }}>
                        <i className="pi pi-user text-4xl text-red-500"></i>
                    </span>
                    <div className="text-900 mb-3 font-medium">Tiene derecho a:</div>
                    <span className="text-700 text-sm line-height-3">Ser asistido por un Abogado.</span>
                </div>
                <div className="col-12 md:col-4 mb-4 px-5">
                    <span className="p-3 shadow-2 mb-3 inline-block surface-card" style={{ borderRadius: '10px' }}>
                        <i className="pi pi-times-circle text-4xl text-red-500"></i>
                    </span>
                    <div className="text-900 mb-3 font-medium">Tiene derecho a:</div>
                    <span className="text-700 text-sm line-height-3">Abstenerse de declarar; y, si acepta. a que su Abogado esté presente.</span>
                </div>
                <div className="col-12 md:col-4 mb-4 px-5">
                    <span className="p-3 shadow-2 mb-3 inline-block surface-card" style={{ borderRadius: '10px' }}>
                        <i className="pi pi-thumbs-down text-4xl text-red-500"></i>
                    </span>
                    <div className="text-900 mb-3 font-medium">Tiene derecho a:</div>
                    <span className="text-700 text-sm line-height-3">Que no se emplee en su contra medios coactivos, intimidatorios o contrarios a su dignidad, ni a ser sometido a técnicas que alteren su voluntad o a sufrir una restricción no permitida por la Ley. </span>
                </div>
                <div className="col-12 md:col-4 md:mb-4 mb-0 px-3">
                    <span className="p-3 shadow-2 mb-3 inline-block surface-card" style={{ borderRadius: '10px' }}>
                        <i className="pi pi-check-circle text-4xl text-red-500"></i>
                    </span>
                    <div className="text-900 mb-3 font-medium">Tiene derecho a:</div>
                    <span className="text-700 text-sm line-height-3">Ser examinado por un médico legista.</span>
                </div>
            </div>
        </div>
    );
}

export default TarjetaDerechos;