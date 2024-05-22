import "../styles/App.css"
import React from "react";
export default function InfoBlock(props) {
    const route = `/flight/${props.flight.id}`;

    return (
        <div className="block">
            <div>
                <img src={props.flight.airline_logo} alt="Logo de la aerolínea" style={{ width: '75px', marginBottom: '10px' }} />
            </div>

            <div>
                <div><b>Salida:</b> {props.flight.departure_airport_name}</div>
                <div><b>Llegada:</b> {props.flight.arrival_airport_name}</div>
                <div><b>Fecha:</b> {props.flight.departure_airport_time.slice(0, 10)}</div>
            </div>

            <a href={route}>Ver más información ✈</a>
        </div>
    );
}
