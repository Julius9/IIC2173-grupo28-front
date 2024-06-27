import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Combobox from "react-widgets/Combobox";
import InfoBlock from "./infoBlock.jsx";

function Stock() {
    const [page, setPage] = useState(1);
    const [destinoSeleccionado, setDestinoSeleccionado] = useState(null);
    const [fechaSeleccionada, setFechaSeleccionada] = useState(null);
    const [destinos, setDestinos] = useState([]);
    const [fechas, setFechas] = useState([]);
    const [flights, setFlights] = useState([]);
    const [vuelo, setVuelo] = useState(null);




    const chargePage = () => {
        useEffect(() => {

            axios.post(`https://api.legitapp.org/flights/reserved`)

                .then((response) => {
                    // Verifica si la respuesta es 200 (OK)
                    if (response.status === 200) {
                        console.log("ingresa la request")
                        const data = response.data.flights;
                        console.log(response.data);

                        const destinosTemp = [];
                        const fechasTemp = [];
                        setFlights(data);

                        data.forEach((f) => {
                            destinosTemp.push(f.arrival_airport);
                            if (!fechasTemp.includes(f.departure_time.slice(0, 10))) {
                                fechasTemp.push(f.departure_time.slice(0, 10));
                            }
                        });

                        setDestinos(destinosTemp);
                        setFechas(fechasTemp);
                    }
                })
                .catch((error) => {

                });
        }, []);
    };


    chargePage()

    return (
        <div>
            <h1>Lista de Vuelos en stock</h1>
            <div>

                <br/>
                <div className="info-blocks">
                    {flights.map((flight, index) => (

                        <InfoBlock key={index} flight={flight} />
                    ))}
                </div></div>


        </div>
    );
}

export default Stock;