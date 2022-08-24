import React from 'react';

export const TarjetaDerechos = () => {

    const styles = {
        body: {
            // height: '100%',
            // width: '100%',
            // background: '#9B1B21',
            backgroundImage: "url(/logos/tderechos.png)",
            color: 'white',
            height: '100vh',
            width: '30vw',
            display: 'flex',
            backgroundPosition: 'center',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
        },
        img: {
            width: '100%'
        }

    }

    return (
        // <div  className="surface-ground px-4 py-8 md:px-4 lg:px-8 flex align-items-center justify-content-center" >
        <div className="grid">
            <div className="col-12">
                {/* <div style={styles.body} className="card"></div> */}
                <div className="card flex align-items-center justify-content-center" >
                    <img src="/logos/tderechos.png" alt="hyper" width='900' className="mb-0" style={styles.img} />
                </div>
            </div>
        </div>
        // </div>
    );
}

export default TarjetaDerechos;