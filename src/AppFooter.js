import React from 'react';

export const AppFooter = (props) => {

    const styles = {
        body: {
            color : 'white'
        }
    }

    return (
        <div className="layout-footer">
            <img src="/logos/logo.svg" alt="Logo" height="20" className="mr-2" />
            <span className="font-medium ml-2" style={styles.body}>Jheyson Gaitan - CSJLL</span>
        </div>
    );
}
