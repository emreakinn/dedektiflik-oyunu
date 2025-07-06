import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';

function Clues() {

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
        <div className='w-full h-[100vh] flex flex-col bg-gray-950 text-gray-300'>
            <div className="text-5xl font-bold py-10 mb-10 text-center">{game.title}</div>
            <div className='text-3xl text-center'>İpuçları</div>
            <div className="flex w-full flex-wrap gap-3 items justify-center">
                {game.clues.map((clue => (
                    <div className='w-[15%] p-3' key={clue.id}>
                        <img className='w-full h-[500px]' src={`/images/${clue.image}`} alt={clue.name} />
                        <p><b>Adı:</b> {clue.title}</p>
                        <p><b>İçerik:</b> {clue.content}</p>
                    </div>
                )))}
            </div>
        </div>
    )
}

export default Clues