import { useState, useContext } from 'react'

import './styles/App.css'
import {AuthContext} from "./auth/AuthContext.jsx";

function App() {
    let iniciadoSesion = false;
    if (localStorage.getItem('token')){
        iniciadoSesion = true;
    }
    let admin = false;
    if (localStorage.getItem('admin')){
        admin = true;
    }

    function handleLogout(){
        localStorage.removeItem('token');
        console.log(localStorage.getItem('token'))
        localStorage.removeItem('admin')

    }

  return (
    <>
        <div className="navbar">
            {admin && <a> admin💺</a>}
            <a href='/'>⌂ Home </a>
            <a href='/flights'> Vuelos ✈ </a>
            {iniciadoSesion && <a href= '/compras'>Mis compras</a>}
            {iniciadoSesion && <a href= '/recomendaciones'>Recomendaciones de Vuelos</a>}
            <a href='/heartbeat'> workers  🛠</a>
            {iniciadoSesion && <a onClick={handleLogout}>Log Out</a>}
            {!iniciadoSesion &&<a href= '/login'>Iniciar Sesión</a>}
            <a href= '/signup'>Registrarse</a>
        </div>


    </>
  )
}

export default App
