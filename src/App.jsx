import { useState, useContext } from 'react'

import './styles/App.css'
import {AuthContext} from "./auth/AuthContext.jsx";

function App() {
    let iniciadoSesion = false;
    if (useContext(AuthContext) ){
        iniciadoSesion = true;
    }

  return (
    <>
        <div className="navbar">
            <a href='/'>⌂ Home </a>
            <a href='/flights'> Vuelos ✈ </a>
            {iniciadoSesion && <a href= '/compras'>Mis compras</a>}
            {!iniciadoSesion &&<a href= '/login'>Iniciar Sesión</a>}
            <a href= '/signup'>Registrarse</a>
        </div>


    </>
  )
}

export default App
