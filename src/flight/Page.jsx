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
    const [reserved, setReserved] = useState(false);
    const [newDiscount, setNewDiscount] = useState(0);
    const [offer, setOffer] = useState(1);
    const [permission, setPermision] = useState("");
    const [stock, setStock] = useState(0);


    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);

                const response = await axios.get(`https://api.legitapp.org/flights/${id}`);
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

    const incrementOffer = () => {
        setOffer(d => d + 1);
    };

    const decrementOffer = () => {
        setOffer(d => Math.max(1, d - 1)); // Asegura que el contador no sea menor que 1
    };

    const incrementOfferFive = () => {
        setOffer(d => d + 5);
    };

    const decrementOfferFive = () => {
        setOffer(d => Math.max(1, d - 5)); // Asegura que el contador no sea menor que 1
    };



    const boughtRequest = async (event) => {

        event.preventDefault();

        axios.post(`https://api.legitapp.org/flights/${id}/check`, {
            ticketsToBook: numTickets, isReservation: reserved, isAdmin: localStorage.getItem('admin')
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
                    setExito('No se pudo completar obtener pasajes. Inténtalo nuevamente.');
                }
            }
        ).catch((error) => {
            console.error('Ocurrió un error BR:', error);
        });
    }

    //Subasta
    const offerTickets = async () => {
        if (localStorage.getItem('admin')){
            axios.post(`https://api.legitapp.org/flights/${id}/auction`,
                { ticketsToPropose: offer,
                    isAdmin: localStorage.getItem('admin') },
                { headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` } })
                .then((response) => {
                    console.log('Tickets ofrecidos con exito')
                }).catch((error) => {
                    console.error('Ocurrió un error BR:', error);
                }
            );
        }else{
            setPermision("Permisos Invalidos NO eres un usuario [ADMIN]")
        }

    }
    const boughtFromReserve = async (event) => {
        setReserved(true);
        if (localStorage.getItem('admin')){
            setPermision("Permisos Invalidos ERES un usuario [ADMIN]")
        }else{
            await boughtRequest()
        }

    }
    const boughtFromGlobal = async (event) => {
        setReserved(false);
        if (localStorage.getItem('admin')){
            setPermision("Permisos Invalidos ERES un usuario [ADMIN]")
        }else{
            await boughtRequest()
        }
    }
    const boughtToReserve = async (event)=>{
        if (localStorage.getItem('admin')){
            await boughtRequest()
        }else{
            setPermision("Permisos Invalidos NO eres un usuario [ADMIN]")
        }
    }

    const activateDiscount = async (event) =>{
        if (localStorage.getItem('admin')){
            console.log("activar descuento");
            axios.post(`https://api.legitapp.org/desc/activate`,
                { activation: true, percentage: newDiscount, flightID: id,
                    isAdmin: localStorage.getItem('admin') },
                { headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` } })
                .then((response) => {
                    console.log('Descuento exitoso')
                }).catch((error) => {
                    console.error('Ocurrió un error BR:', error);
                }
            );

        }else{
            setPermision("Permisos Invalidos NO eres un usuario [ADMIN]")
        }
    }
    const deactivateDiscount = async (event) =>{
        if (localStorage.getItem('admin')){
            console.log("activar descuento");
            axios.post(`https://api.legitapp.org/desc/activate`,
                { activation: false, percentage: newDiscount, flight_id: id,
                    isAdmin: localStorage.getItem('admin') },
                { headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` } })
                .then((response) => {
                    console.log('Cancelando el descuento')
                }).catch((error) => {
                    console.error('Ocurrió un error BR:', error);
                }
            );

        }else{
            setPermision("Permisos Invalidos NO eres un usuario [ADMIN]")
        }
    }

    const transactionData = async () => {
        axios.post(`https://api.legitapp.org/transaction/create`, {
            flight_id: id,
            quantity: numTickets,
            isReservation: reserved,
            isAdmin: localStorage.getItem('admin')
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

    const getOurReservations = async () => {
        // obtengo informacion si es que nosotros tenemos pasajes

        console.log("activar descuento");
        axios.post(`https://api.legitapp.org/flights/reserved/${id}`)
                .then((response) => {
                    setStock(response.num_boletos)
                }).catch((error) => {
                    console.error('Ocurrió un error BR:', error);
                }
            );
    }
   getOurReservations()

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
                <p>💺<b>Boletos en nuestro Stock:</b> {stock}</p>
                <br/>
                <div className="calculate">
                    <button onClick={handleDecrement}>-</button>
                    <span>{numTickets}</span>
                    <button onClick={handleIncrement}>+</button>
                </div>
                <div>
                    <h1>{Permision}</h1>
                    <h1>{exito}</h1>
                    <button onClick={boughtFromGlobal}>
                        Comprar del Mercado
                    </button>

                    <button onClick={boughtFromReserve}>
                        Comprar de nuestro Stock
                    </button>

                    <button onClick={boughtToReserve}>
                        Reservar tickets
                    </button>

                </div>




            </div>
            <div className="panelControl">
                <h1>Panel de Control [ADMIN]</h1>
                <h1>{Permision}</h1>
                <div className="Panels">
                    <div className="OfferPanel">
                        <h1>Panel de Ofertas</h1>
                        <div className="DiscountButtons">
                            <h3>Descuento a ofrecer: {newDiscount}%</h3>
                            <div className="Discounts">
                                <button onClick={setNewDiscount(0.05)}> 5% </button>
                                <button onClick={setNewDiscount(0.1)}>10%</button>
                                <button onClick={setNewDiscount(0.2)}>20%</button>
                            </div>
                            <button className="Activate" onClick={activateDiscount}>Activar Descuento</button>
                            <button className="Activate" onClick={deactivateDiscount}>Desactivar Descuento</button>
                        </div>
                    </div>
                    <div className="SubastaPanel">
                        <h1>Panel de Subastas</h1>
                        <div className="subastaSubPanel">
                            <div className="calculator">
                                <div className="view">
                                    <button onClick={incrementOfferFive}>+5</button>
                                    <button onClick={incrementOffer}>+</button>
                                    <br />
                                    <h3>Ofreceremos: {offer}</h3>
                                    <br />
                                    <button onClick={decrementOffer}>-</button>
                                    <button onClick={decrementOfferFive}>-5</button>
                                </div>
                            </div>
                            <br />
                            <button className="OfferButton" onClick={offerTickets}>Ofertar Tickets en Subasta</button>
                        </div>
                    </div>
                </div>
            </div>

        </>
    );
}

export default FlightInfo;
