import React, { useState, useEffect } from 'react';
import axios from 'axios';
import InfoBlock from "./infoBlock.jsx";

function Recomendation() {
    const [flights, setFlights] = useState([]);
    const [date, setDate] = useState('2024-01-01');
    const [response, setResponse] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`https://api.legitapp.org/latest`,  {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    }});
                if (response.status === 200) {
                    const data = response.data.result;
                    const vuelos = []
                    data.forEach((f) => {
                        vuelos.push(fetchVuelos(f.flightID));

                    });


                    setDate(response.data.completedAt);
                    setFlights(vuelos);
                    setResponse(true);
                }
            } catch (error) {
                console.log("Error en recomendation:", error);
            }
        };

        fetchData();
    }, []);

    const fetchVuelos = async (id) => {
        try {
            setLoading(true);

            const response = await axios.get(`https://api.legitapp.org/flights/${id}`);


            return response.data;
        } catch (error) {
            console.error('Error al obtener la información del vuelo:', error);
            setLoading(false);
        }
    };



    return (
        <>
            <h1>Te recomendamos los siguientes vuelos</h1>
            <h3>A partir de los datos de tu última compra</h3>
            <br />
            {response === false ? (
                <h2><b>No has realizado compras</b></h2>
            ) : (
                <div>
                    <h2><b>Ultima actualizacion:</b> date</h2>
                    <div className="info-blocks">
                        {flights.map((flight, index) => (
                            <InfoBlock key={index} flight={flight} />
                        ))}
                    </div>
                </div>
            )}
        </>
    );
}

export default Recomendation;