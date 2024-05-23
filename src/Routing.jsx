import { BrowserRouter, Routes, Route } from 'react-router-dom/dist'
import Login from './user/login'
import Signup from "./user/signup.jsx";
import App from "./App.jsx";
import LandingPage from "./LandingPage.jsx";
import FlightInfo from "./flight/Page.jsx";
import Flights from "./index/flights.jsx";
import Bought from "./compras/Bought.jsx";
import ConfirmPurchase from "./compras/confirmPurchase.jsx";
import CompraCompletada from "./compras/purchaseCompleted.jsx";
import Workers from "./workers/woerkers.jsx";
import Recomendation from "./index/recomendation.jsx";


function Routing(){
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path={'/'} element={<LandingPage/>}/>
                    <Route path={'/login'} element={<Login/>}/>
                    <Route path={'/signup'} element={<Signup/>}/>
                    <Route path={'/flights'} element={<Flights/>}/>
                    <Route path={'/compras'} element={<Bought/>}/>
                    <Route path={'/compras/confirmar'} element={<ConfirmPurchase/>}/>
                    <Route path={'/compra-completada'} element={<CompraCompletada/>}/>
                    <Route path="/flight/:id" element={<FlightInfo />} />
                    <Route path="/heartbeat" element={<Workers/>}/>
                    <Route path="/recomendaciones" element={<Recomendation/>}/>



                </Routes>
            </BrowserRouter>
        </>
    )
}
export default Routing