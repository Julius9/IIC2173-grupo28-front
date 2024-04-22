
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import "../styles/App.css"

function FlightInfo() {
    const { id } = useParams();
    const [flightInfo, setFlightInfo] = useState(null);
    const [loading, setLoading] = useState(true);
    const [numTickets, setNumTickets] = useState(1);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const response = await axios.get(`https://api.legitapp.org/flights/${id}`);
                setFlightInfo(response.data);
                console.log(response.data)
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
        console.log(localStorage.getItem('token'))
        event.preventDefault();

        axios.post(`https://api.legitapp.org/flights/${id}/reservar`, {
            ticketsToBook: numTickets
        }, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        }).then((response) => {
            console.log('Registro exitoso! Ahora puedes volver y loguearte');
            setError(false);
            setMsg('Registro exitoso! Ahora puedes volver y loguearte');
        }).catch((error) => {
            console.error('Ocurrió un error:', error);
            //console.log(error.response.data.errors[0].message)
            //console.log((error.response.data['errors']))
            if ((error.response.data['errors']) == undefined){
                setMsg(error.response.data)
            }else{
                setMsg(error.response.data.errors[0].message)
            }
            setError(true); // aquí puede haber más lógica para tratar los errores
        });
    }

    return (
        <>
            <h1>Información del Vuelo</h1>
            <img src={flightInfo.airline_logo} alt="Logo de la aerolínea" style={{ width: '100px', marginBottom: '10px' }} />
            <div className="page">


                <p>Aerolínea: {flightInfo.airline}</p>
                <p>Aeropuerto de Salida: {flightInfo.departure_airport_name} ({flightInfo.departure_airport_id})</p>
                <p>Aeropuerto de Llegada: {flightInfo.arrival_airport_name} ({flightInfo.arrival_airport_id})</p>
                <p>Fecha de Salida: {new Date(flightInfo.departure_airport_time).toLocaleString()}</p>
                <p>Fecha de Llegada: {new Date(flightInfo.arrival_airport_time).toLocaleString()}</p>
                <p>⏳Duración del Vuelo: {flightInfo.duration} minutos</p>
                <p>✈Avión: {flightInfo.airplane}</p>
                <p>💳Precio: {flightInfo.price} {flightInfo.currency}</p>
                <p>💺Boletos Restantes: {flightInfo.tickets_left}</p>
                <br/>

                <div>
                    <button onClick={handleDecrement}>-</button>
                    <span>{numTickets}</span>
                    <button onClick={handleIncrement}>+</button>
                </div>
                <a  onClick={boughtRequest}>Comprar {numTickets} boletos</a>
            </div>
        </>
    );
}

export default FlightInfo;