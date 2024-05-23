import React, { useState, useEffect } from 'react';
import axios from 'axios';
function Workers(){
    const [estado, setestado] = useState(" consultando...")
    const chargePage = () => {
        useEffect(() => {

            axios.get(`https://api.legitapp.org/heartbeat`)

                .then((response) => {
                    // Verifica si la respuesta es 200 (OK)
                    if (response.status === 200) {
                        setestado(" trabajando 🛠")


                    }
                })
                .catch((error) => {
                    setestado(" apagado 🔴")

                });
        }, []);
    };
    chargePage()

    return(
        <>
            <h1><b>Estado actual del servicio maestro de Workers:</b>{estado}</h1>
        </>
    )

}
export default Workers