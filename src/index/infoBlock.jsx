import "../styles/App.css"
export default function InfoBlock(props) {
    const route = `/flight/${props.flight.id}`;

    return (
        <div className="block">
            <div>Aeropuerto de Salida: {props.flight.departure_airport_name}</div>
            <div>Aeropuerto de Llegada: {props.flight.arrival_airport_name}</div>
            <div> Fecha: {props.flight.departure_airport_time.slice(0, 10)}</div>
            <a href={route}>Ver más información ✈</a>
        </div>
    );
}
