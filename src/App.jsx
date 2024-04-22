import { useState, useContext } from 'react'

import './styles/App.css'
import {AuthContext} from "./auth/AuthContext.jsx";

function App() {
    let iniciadoSesion = false;
    if (localStorage.getItem('token')){
        iniciadoSesion = true;
    }

    function handleLogout(){
        localStorage.removeItem('token');
        console.log(localStorage.getItem('token'))

    }

  return (
    <>
        <div className="navbar">
            <a href='/'>⌂ Home </a>
            <a href='/flights'> Vuelos ✈ </a>
            {iniciadoSesion && <a href= '/compras'>Mis compras</a>}
            {iniciadoSesion && <a onClick={handleLogout}>Log Out</a>}
            {!iniciadoSesion &&<a href= '/login'>Iniciar Sesión</a>}
            <a href= '/signup'>Registrarse</a>
        </div>


    </>
  )
}

export default App
