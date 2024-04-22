
import React from 'react';
import { useParams } from 'react-router-dom';

function FlightInfo() {
    // Obtener el parámetro "id" de la ruta
    const { id } = useParams();

    // Ahora puedes utilizar el ID en tu lógica para obtener la información del vuelo correspondiente

    return (
        <>
            <h1>Información del Vuelo</h1>
            <p>ID del vuelo: {id}</p>
            {/* Aquí puedes agregar el resto de tu JSX */}
        </>
    );
}

export default FlightInfo;
