import React, { useState } from 'react';
import axios from 'axios';



function Signup() {
    const [username, setUsername] = useState("");
    const [mail, setmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(false);
    const [msg, setMsg] = useState("");


    const handleSubmit = async (event) => {
        event.preventDefault();

        axios.post(`http://localhost:3003/api/auth/register`, {
            username: username,
            mail: mail,
            password: password
        }).then((response) => {
            console.log('Registro exitoso! Ahora puedes volver y loguearte');
            setError(false);
            setMsg('Registro exitoso! Ahora puedes volver y loguearte');
        }).catch((error) => {
            console.error('Ocurrió un error:', error);
            //console.log(error.response.data.errors[0].message)
            //console.log((error.response.data['errors']))
            if ((error.response.data['errors']) == undefined){
                setMsg(error.response.data)
            }else{
                setMsg(error.response.data.errors[0].message)
            }
            setError(true); // aquí puede haber más lógica para tratar los errores
        });
    }

    return (
        <div className='loginDiv'>
            <div className="Login">
                {!error && msg.length > 0 && <div className="successMsg"> {msg} </div>}

                {error && msg.length > 0 && <div className="error">{msg}</div>}

                <form onSubmit={handleSubmit}>
                    <label>
                        Tu Apodo:
                        <input
                            type="text"
                            name="username"
                            value={username}
                            onChange={e => setUsername(e.target.value)}
                            required
                        />
                    </label>
                    <label>
                        Email:
                        <input
                            type="email"
                            name="ememail"
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
                    <input type="submit" value="Submit" />
                </form>
            </div>
        </div>
    );
}

export default Signup;