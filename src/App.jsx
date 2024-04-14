import { useState } from 'react'

import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
        <div className="navbar">
            <a href='/'>⌂</a>
            <a href= '/questions'>Preguntas Frecuentes</a>
            <a href= '/login'>Iniciar Sesión</a>
            <a href= '/signup'>Registrarse</a>
        </div>


        <img className="imgCenter" src="https://res.cloudinary.com/darhaqq0v/image/upload/v1713117225/pngwing.com_1_i3u0yc.png" alt="avion" />
        <h1>Aerolinea 28</h1>



    </>
  )
}

export default App
