import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import backgroundImg from '../assets/background.png'

function Main() {

    const [games, setGames] = useState([]);

    useEffect(() => {
        fetch('/data.json')
            .then(res => res.json())
            .then(data => setGames(data.senarios));
    }, []);

    return (
        <div className='w-full h-[100vh] bg-gray-950 flex flex-col gap-5 flex-wrap p-5'>
            <div className="w-full text-center text-7xl py-5 special text-gray-300">HİKAYE SEÇ</div>
            <div className="w-full flex flex-row flex-wrap gap-5">
                {games.map(game => (
                    <div className='w-[20%] p-1 bg-gray-300 border text-gray-950' key={game.id}>
                        <img src={backgroundImg} alt="" />
                        <div className="py-2 text-xl cormorant">
                            <b>Oyun Adı:</b> {game.title}
                        </div>
                        <div className="py-2 text-lg cormorant">
                            <b>Oyun Özeti:</b> {game.description}
                        </div>
                        <div className="text-center special">
                            <Link to={`${game.title}`}>
                                <button className="bg-gray-950 uppercase text-gray-300 w-50 px-4 py-2 rounded cursor-pointer">
                                    <b>Oyna</b>
                                </button>
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Main