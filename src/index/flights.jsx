import InfoBlock from "./infoBlock.jsx";
import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';
import Page from "../flight/Page.jsx";
import '../styles/App.css'
import Combobox from "react-widgets/Combobox";


export const PageContext = createContext(null);
function Flights(){
    const destinos= []
    const fechas = []
    const ChargePage = ()=>{
        const [vuelo, setVuelo] = useState("")
        const [flights, setFlights] = useState("")


        useEffect(() => {

            console.log(`Haciendo el request a localhost/flights`);

            axios.get('localhost:3000/flights').then((response) => {
                const data = response.data;
                console.log(data)

                data.map((f)=>{
                    destinos.push(f.arrival_airport)
                    if (!fechas.includes(f.departure_time.slice(0,-6))){
                        fechas.push(f.departure_time.slice(0,-6));
                    }
                });




            })
                .catch((error) => {
                    console.log(error);
                });
        }, [])
    }
    ChargePage()

    return(
        <div>
            <h1>Lista de Vuelos</h1>
            <div className="navbar">
                <div>Busqueda por filtros: </div>
                <div> Destinos: <Combobox

                    data={destinos}
                /></div>
                <div> Fecha de Partida: <Combobox

                    data={fechas}
                /></div>

                <button variant="outlined">Buscar</button>
            </div>
    </div>
    )
 }
 export default Flights;