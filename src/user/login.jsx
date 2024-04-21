import axios from 'axios';
import React, { useState, useContext, createContext } from 'react';
import {AuthContext} from "../auth/AuthContext.jsx";

function Login(){
    const { token, setToken } = AuthContext;
    const [mail, setmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(false);
    const [msg, setMsg] = useState("");

    const handleSubmit = async (event) => {
        event.preventDefault();
        //
        axios.post(`http://localhost:3003/api/auth/login`, {
            email: mail,
            password: password
        }).then((response) => {
            console.log('Login successful');
            setError(false);
            setMsg("Login exitoso!");
            // Recibimos el token y lo procesamos
            const access_token = response.data.token;
            //localStorage.setItem('token', access_token);
            setToken(access_token);
            console.log("Se seteo el token: ", token);
        }).catch((error) => {
            console.error('An error occurred while trying to login:', error);
            setError(true);// aquí puede haber más lógica para tratar los errores
        })

    };
    return (
        <div className="Login">
            {msg.length > 0 && <div className="successMsg"> {msg} </div>}

            {error && <div className="error">Hubo un error con el Login, por favor trata nuevamente.</div>}
            <form onSubmit={handleSubmit}>
                <label>
                    Email:
                    <input
                        type="email"
                        name="email"
                        value={mail}
                        onChange={e => setmail(e.target.value)}
                        required
                    />
                </label>
                <label>
                    Password:
                    <input
                        type="password"
                        name="password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        required
                    />
                </label>
                <input type="submit" value="Enviar" />
            </form>
        </div>
    )
}

export default Login;