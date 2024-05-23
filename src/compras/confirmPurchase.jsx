import React from 'react';
import { useLocation } from 'react-router-dom';

function Confirm() {
    const location = useLocation();
    const { url, token, amount, destiny, price } = location.state;

    console.log(price, amount)

    return (
        <div className="p-20">
            <p className="text-6xl text-center font-extrabold text-sky-500">Confirmar compra</p>
            <form className="flex flex-col gap-5 border rounded-xl shadow-[0_0px_8px_#b4b4b4] p-6 mt-5" action={url} method="POST">
                <input type="hidden" name="token_ws" value={token} />
                <div className="flex flex-col gap-2">
                    <p className="text-2xl font-bold">Confirmas la compra?</p>
                    <p>Destino: {destiny}</p>
                    <p>Cantidad: {amount}</p>
                </div>
                <button className="bg-sky-500 text-white rounded px-5 py-2" type="submit">
                    {price && amount ? `Pagar $${price * amount}` : 'Pagar $0'}
                </button>
            </form>
        </div>
    );
}

export default Confirm;