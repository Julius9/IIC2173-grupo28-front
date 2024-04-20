import { BrowserRouter, Routes, Route } from 'react-router-dom/dist'
import Login from './user/login'
import Signup from "./user/signup.jsx";
function Routing(){
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path={'/'} element={<LandingPage/>}/>
                    <Route path={'/login'} element={<Login/>}/>
                    <Route path={'/signup'} element={<Signup/>}/>
                    <Route path={'/compras'} element={<Bought/>}/>

                </Routes>
            </BrowserRouter>
        </>
    )
}
export default Routing