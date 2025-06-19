import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

function Main() {

    const [games, setGames] = useState([]);

    useEffect(() => {
        fetch('/data.json')
            .then(res => res.json())
            .then(data => setGames(data.senarios));
    }, []);

    return (
        <div className='flex justify-start gap-5 flex-wrap p-5'>
            {games.map(game => (
                <div className='w-[30%] p-3 bg-gray-200 border' key={game.id}>
                    <div className="text-center py-2">
                        <h2 className='text-3xl'><b>Oyun Adı:</b> {game.title}</h2>
                    </div>
                    <p><b>Oyun Özeti:</b> {game.description}</p>
                    <div className="text-center">
                        <Link to={`/oyun/${game.id}`}>
                            <button className="bg-gray-600 text-white w-50 px-4 py-2 rounded">
                                Oyna
                            </button>
                        </Link>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default Main