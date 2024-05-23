import React, {useState, useEffect} from 'react';
import { Link, useSearchParams } from "react-router-dom";
import axios from "axios";
import "../styles/App.css"


function CompraCompletada() {

    const [searchParams] = useSearchParams();
    const [data, setData] = useState({});
    useEffect(() => {
        const commitTransaction = async (event) => {
            console.log(localStorage.getItem('token'))
            // event.preventDefault();


            axios.post(`https://api.legitapp.org/transaction/commit`, {

                ws_token: searchParams.get('token_ws') || '',
                request_id: searchParams.get('request_id') || ''


            }, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            }).then(
                (response) => {
                    console.log('Response body:', response.data);
                    setData(response.data)

                }
            ).catch((error) => {
                console.error('Ocurrió un error CT:', error);
                //console.log(error.response.data.errors[0].message)
                //console.log((error.response.data['errors']))


            });
        }
        commitTransaction();
    }, [searchParams]);

    console.log("Esta es la data: ", data)

    return (
        <div className="p-8 mt-20 flex flex-col gap-3 w-1/3 mx-auto rounded-xl shadow-[0_0px_8px_#b4b4b4]">
            <h1 className="text-center">Purchase Completed</h1>
            <p>{data.message}</p>
            <Link to="/" className="bg-black text-white px-3 py-2 rounded text-center">Volver a inicio</Link>
        </div>
    );

}

export default CompraCompletada