import React from 'react'

function FullLoader({loader}) {
    return (
        <>
            {loader ? 
                <div className="full-loader">
                    <div className="spinner"><i className="fas fa-spinner fa-4x"></i></div>
                </div>
                : null}
        </>
    )
}

export default FullLoader
