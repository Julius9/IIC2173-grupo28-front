import axios from 'axios';
import React, { useState } from 'react';

function Login() {
    const [mail, setMail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(false);
    const [msg, setMsg] = useState("");

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await axios.post(`http://localhost:3003/api/auth/login`, {
                mail: mail,
                password: password
            });

            console.log('Login successful');
            setError(false);
            setMsg("Login exitoso!");

            // Recibimos el token y lo procesamos
            const access_token = response.data.token;
            localStorage.setItem('token', access_token);
            console.log("Se seteó el token:", access_token);
        } catch (error) {
            console.error('An error occurred while trying to login:', error);
            setError(true); // aquí puede haber más lógica para tratar los errores
        }
    };

    return (
        <div className='loginDiv'>
            <div className="Login">
                <img src="https://static-00.iconduck.com/assets.00/user-icon-2048x2048-ihoxz4vq.png" alt="icon user" style={{ width: '100px', marginBottom: '10px' }} />
            {msg.length > 0 && <div className="successMsg"> {msg} </div>}
            {error && <div className="error">Hubo un error con el Login, por favor trata nuevamente.</div>}
            <form onSubmit={handleSubmit}>
                <label>
                    Email:
                    <input
                        type="email"
                        name="email"
                        value={mail}
                        onChange={e => setMail(e.target.value)}
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
        </div>

    );
}

export default Login;
