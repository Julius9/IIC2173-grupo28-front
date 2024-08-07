import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Combobox from "react-widgets/Combobox";
import InfoBlock from "./infoBlock.jsx";

function Flights() {
    const [page, setPage] = useState(1);
    const [destinoSeleccionado, setDestinoSeleccionado] = useState(null);
    const [fechaSeleccionada, setFechaSeleccionada] = useState(null);
    const [destinos, setDestinos] = useState([]);
    const [fechas, setFechas] = useState([]);
    const [flights, setFlights] = useState([]);
    const [vuelo, setVuelo] = useState(null);

    const nextPage = () => {
        setPage(actualPage => actualPage + 1);
        handleBuscarClick()
    };
    const prevPage = () => {
        if (page > 1){
            setPage(actualPage => actualPage - 1);
            handleBuscarClick()
        }

    };

    const chargePage = () => {
        useEffect(() => {

            axios.get(`https://api.legitapp.org/flights`)

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

    const handleBuscarClick = () => {
        const params = {};
        if (destinoSeleccionado !== null) {
            params.arrival = destinoSeleccionado;

        }
        if (fechaSeleccionada !== null) {
            params.date = fechaSeleccionada;
        }
        params.page = page;
        console.log(params)

        axios.get('https://api.legitapp.org/flights', {

            params
        })
            .then(response => {

                console.log('Respuesta de la solicitud:', response.data);
                setFlights(response.data.flights); // Actualizar la lista de vuelos
            })
            .catch(error => {

            });
    };
    chargePage()

    return (
        <div>
            <h1>Lista de Vuelos</h1>
            <div>
                <div className="searchblock">
                <div>Busqueda por filtros: </div>
                <div>
                    Aeropuerto de LLegada:
                    <input
                        type="text"
                        placeholder="Ingrese aeropuerto de LLegada"
                        onChange={event => setDestinoSeleccionado(event.target.value)}
                    />
                </div>

                <div>
                    Fecha de Partida:
                    <input
                        type="text"
                        placeholder="Ingrese fecha de partida"
                        onChange={event => setFechaSeleccionada(event.target.value)}
                    />
                </div>
                <button variant="outlined" onClick={handleBuscarClick}>Buscar</button>


            </div>
                <div className="pageBox">
                    <b>Pagina</b>

                    <div className="pageBar">
                        <button onClick={prevPage} >Prev </button>
                        <div>{page}</div>
                        <button onClick={nextPage} >Next </button>
                    </div>

                </div>
                <br/>
                <div className="info-blocks">
                    {flights.map((flight, index) => (

                        <InfoBlock key={index} flight={flight} />
                    ))}
                </div></div>


        </div>
    );
}

export default Flights;
