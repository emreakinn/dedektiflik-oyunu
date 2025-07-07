import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';

function Suspects() {

    const { title, character } = useParams();
    const [game, setGame] = useState(null);

    useEffect(() => {
        fetch('/data.json')
            .then(res => res.json())
            .then(data => {
                const foundGame = data.senarios.find(s => s.title === title);
                setGame(foundGame);
            });
    }, [title, character]);

    if (!game) return <div>Yükleniyor...</div>;

    return (
        <div>
            <div className='w-full h-[100vh] flex flex-col bg-gray-950 text-gray-300 text-center'>
                <div className="text-5xl font-bold py-10 mb-10">{game.title}</div>
                <div className='text-3xl'>Şüpheliler</div>
                <div className="flex w-full flex-wrap justify-center">
                    {game.characters.map((character => (
                        <div className='w-[15%] p-3' key={character.id}>
                            <img className='w-full h-[500px]' src={`/images/${character.image}`} alt={character.name} />
                            <p><b>Adı:</b> {character.name}</p>
                            <Link to={`/game/${title}/suspects/character/${character.name}`}>
                                <button className="bg-gray-600 text-white w-50 px-4 py-2 rounded cursor-pointer">
                                    İncele
                                </button>
                            </Link>
                        </div>
                    )))}
                </div>
            </div>
        </div>
    )
}

export default Suspects