import axios from 'axios';
import React, { useState, useContext } from 'react';
import { AuthContext } from '../auth/AuthContext';
function Login(){
    const { token, setToken } = useContext(AuthContext);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(false);
    const [msg, setMsg] = useState("");

    const handleSubmit = async (event) => {
        event.preventDefault();

        axios.post(`${import.meta.env.API_URL}/login`, {
            email: email,
            password: password
        }).then((response) => {
            console.log('Login successful');
            setError(false);
            setMsg("Login exitoso!");
            // Recibimos el token y lo procesamos
            const access_token = response.data.access_token;
            //localStorage.setItem('token', access_token);
            setToken(access_token);
            console.log("Se seteo el token: ", token);
        }).catch((error) => {
            console.error('An error occurred while trying to login:', error);
            setError(true);// aquí puede haber más lógica para tratar los errores
        })

    };
    return (
        <form onSubmit={handleSubmit}>
            <label>
                Email:
                <input
                    type="email"
                    name="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
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
    )
}

export default Login()