import { BrowserRouter, Routes, Route } from 'react-router-dom/dist'
import Login from './user/login'
import Signup from "./user/signup.jsx";
import App from "./App.jsx";
import LandingPage from "./LandingPage.jsx";
import FlightInfo from "./flight/Page.jsx";
import Flights from "./index/flights.jsx";


function Routing(){
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path={'/'} element={<LandingPage/>}/>
                    <Route path={'/login'} element={<Login/>}/>
                    <Route path={'/signup'} element={<Signup/>}/>
                    <Route path={'/flights'} element={<Flights/>}/>
                    <Route path="/flight/:id" element={<FlightInfo />} />



                </Routes>
            </BrowserRouter>
        </>
    )
}
export default Routing