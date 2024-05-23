import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import "../styles/App.css"

function FlightInfo() {
    const navigate = useNavigate();
    const { id } = useParams();
    const [flightInfo, setFlightInfo] = useState(null);
    const [loading, setLoading] = useState(true);
    const [numTickets, setNumTickets] = useState(1);
    const [exito, setExito] = useState("comprar");
    const [price, setPrice] = useState(0);
    const [destino, setDestino] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);

                const response = await axios.get(`http://localhost:3000/flights/${id}`);
                const data = response.data;

                setFlightInfo(data);
                setPrice(data.price); // Actualiza el estado del precio
                setDestino(data.arrival_airport_name); // Actualiza el estado del destino
                setLoading(false);
            } catch (error) {
                console.error('Error al obtener la información del vuelo:', error);
                setLoading(false);
            }
        };

        fetchData();
    }, [id]); // El efecto se ejecutará cada vez que cambie el parámetro 'id'

    if (loading) {
        return <p>Cargando...</p>;
    }

    if (!flightInfo) {
        return <p>No se encontró información para el vuelo con ID {id}</p>;
    }

    const handleIncrement = () => {
        setNumTickets(prevNumTickets => prevNumTickets + 1);
    };

    const handleDecrement = () => {
        setNumTickets(prevNumTickets => Math.max(1, prevNumTickets - 1)); // Asegura que el contador no sea menor que 1
    };

    const boughtRequest = async (event) => {
        console.log(localStorage.getItem('token'));
        event.preventDefault();

        axios.post(`http://localhost:3000/flights/${id}/check`, {
            ticketsToBook: numTickets
        }, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        }).then(
            (response) => {
                console.log('Response body:', response.data);

                if (response.data.valid) {
                    setExito('Registro exitoso! Ahora se procedera a la compra.');
                    transactionData();
                } else {
                    setExito('No se pudo completar la reserva. Inténtalo nuevamente.');
                }
            }
        ).catch((error) => {
            console.error('Ocurrió un error BR:', error);
        });
    }

    const transactionData = async () => {
        axios.post(`http://localhost:3000/transaction/create`, {
            flight_id: id,
            quantity: numTickets
        }, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        }).then(
            (response) => {
                navigate(`/compras/confirmar`, {
                    state: {
                        url: response.data.url,
                        token: response.data.token,
                        amount: numTickets,
                        destiny: destino, // Usamos el estado para el destino
                        price: price // Usamos el estado para el precio
                    }
                });
            }
        ).catch((error) => {
            console.error('Ocurrió un error TD:', error);
        });
    }

    return (
        <>
            <h1>Información del Vuelo</h1>
            <img src={flightInfo.airline_logo} alt="Logo de la aerolínea" style={{ width: '100px', marginBottom: '10px' }} />
            <div className="page">
                <p> <b>Aerolínea:</b> {flightInfo.airline}</p>
                <p><b>Aeropuerto de Salida:</b> {flightInfo.departure_airport_name} ({flightInfo.departure_airport_id})</p>
                <p><b>Aeropuerto de Llegada:</b> {flightInfo.arrival_airport_name} ({flightInfo.arrival_airport_id})</p>
                <p><b>Fecha de Salida:</b> {new Date(flightInfo.departure_airport_time).toLocaleString()}</p>
                <p><b>Fecha de Llegada:</b> {new Date(flightInfo.arrival_airport_time).toLocaleString()}</p>
                <p><b>⏳Duración del Vuelo:</b> {flightInfo.duration} minutos</p>
                <p>✈<b>Avión:</b> {flightInfo.airplane}</p>
                <p>💳<b>Precio:</b> {flightInfo.price} {flightInfo.currency}</p>
                <p>💺<b>Boletos Restantes:</b> {flightInfo.tickets_left}</p>
                <br/>
                <div className="calculate">
                    <button onClick={handleDecrement}>-</button>
                    <span>{numTickets}</span>
                    <button onClick={handleIncrement}>+</button>
                </div>
                <button onClick={boughtRequest}>
                    Confirmar Compra
                </button>
                {/* <p>{exito}</p> */}
            </div>
        </>
    );
}

export default FlightInfo;
