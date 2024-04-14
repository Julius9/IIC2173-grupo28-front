import { BrowserRouter, Routes, Route } from 'react-router-dom/dist'

function Routing(){
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path={'/'} element={<LandingPage/>}/>

                </Routes>
            </BrowserRouter>
        </>
    )
}
export default Routing