import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function Characters() {
    const { oyunId, karakterId } = useParams();
    const [character, setCharacter] = useState(null);
    const [game, setGame] = useState(null);

    useEffect(() => {
        fetch('/data.json')
            .then(res => res.json())
            .then(data => {
                const foundGame = data.senarios.find(g => g.id === parseInt(oyunId));
                const foundCharacter = foundGame?.characters.find(c => c.id === parseInt(karakterId));
                setGame(foundGame);
                setCharacter(foundCharacter);
            });
    }, [oyunId, karakterId]);

    if (!character || !game) return <div>Yükleniyor...</div>;

    return (
        <div className="p-6">
            <div className='text-center'>
                <h1 className="text-4xl font-bold">{game.title}</h1>
            </div>
            <div className="flex p-5">
                <div className='w-1/3'>
                    <img
                        src={`/images/${character.image}`}
                        alt={character.name}
                        className="w-full h-[500px] object-cover rounded mb-4"
                    />
                </div>
                <div className='w-2/3 p-5'>
                    <h2><b>Adı: </b>{character.name}</h2>
                    <p><b>Kimdir: </b>{character.role}</p>
                    <p><b>Not: </b>{character.notes}</p>
                    <div>
                        <h3 className="text-lg font-semibold mb-2">Polis Sorgusu:</h3>
                        {character.statements.map((item, index) => (
                            <div key={index} className="mb-4 text-left border-l-4 border-gray-400 pl-3">
                                <p className="font-bold text-gray-700"> {item.question}</p>
                                <p className="text-gray-800"> {item.answer}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Characters;
