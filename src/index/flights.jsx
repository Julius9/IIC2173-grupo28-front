 function Flights(){
    const ChargePage = ()=>{
        useEffect(() => {
            const config = {
                'method': 'get',
                'url': `${import.meta.env.API_URL}/flights`,
                'headers': {
                    'Authorization': `Bearer ${token}`
                }
            };
            console.log(`Haciendo el request a ${import.meta.env.API_URL}/flights`);

            axios(config).then((response) => {
                const data = response.data;
                const vuelos = {};
                data.Players.map((player) => {
                    characters[player.id] = player;
                    if (player.color ==  response.data.color){
                        setJugador({player})
                    }
                });

            })
                .catch((error) => {
                    console.log(error);
                });
        }, [])
    }

    return(
        <h1>Lista de Vuelos</h1>

    )
 }
 export default Flights;