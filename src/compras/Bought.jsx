
import {useEffect, useState} from "react";
import axios from "axios";
import "../styles/App.css"

// revisar el estado de los pasajes comprados antes



function Bought(){
    const [compra,setCompra] = useState([])
    const chargePage = () => {

        useEffect(() => {
            axios.get('https://api.legitapp.org/compras',  {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }})
                .then((response) => {
                    // Verifica si la respuesta es 200 (OK)
                    if (response.status === 200) {
                        console.log("ingresa la request")
                        const data = response.data;
                        console.log(response.data);
                        setCompra(data)
                    }
                })
                .catch((error) => {

                });
        }, []);}

    chargePage()

   return(
       <>
           {compra.map(c => (
               <div className="page">
                   <p> Boletos comprados en {c.purchase_date}</p>
                   <br/>
                   <p>Destino: {c.arrival_airport_name}</p>
                   <p>Aeropuerto de salida: {c.departure_airport_name}</p>
                   <p>Aerolinea: {c.airline}</p>
                   <p>Asientos: {c.cuantity}</p>
                   <br/>
                   <p>{c.price} {c.currency}</p>

               </div>
           ))

           }

       </>
   )

}

export default Bought;