import InfoBlock from "./infoBlock.jsx";
import React, { createContext, useState, useContext, useEffect } from 'react';

function Flights(){
    const ChargePage = ()=>{
        const [vuelo, setVuelo] = useState("")
        const [flights, setFlights] = useState("")
        useEffect(() => {
            const config = {
                'method': 'get',
                'url': `${import.meta.env.API_URL}/flights`,
                'headers': {
                    'Authorization': `Bearer ${token}`
                }
            };
            console.log(`Haciendo el request a ${import.meta.env.API_URL}/flights`);

            axios(config).then((response) => {
                const data = response.data.flights;
                const vuelos = {};
                data.InfoBlock .map((vuelo) => {
                    vuelos[vuelo.id] = vuelo;
                    setVuelo({vuelo});
                });
                setFlights(vuelos)

            })
                .catch((error) => {
                    console.log(error);
                });
        }, [])
    }

    return(

        <section>
            <h1>Lista de Vuelos</h1>
            {Object.values(flights).map(p =>
                (
                    <InfoBlock

                    />
                )
            )}
        </section>

    )
 }
 export default Flights;