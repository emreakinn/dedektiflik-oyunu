import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function Characters() {
    const { title, characterName } = useParams();
    const [character, setCharacter] = useState(null);
    const [game, setGame] = useState(null);

    useEffect(() => {
        fetch('/data.json')
            .then(res => res.json())
            .then(data => {
                const foundGame = data.senarios.find(g => g.title === title);
                const foundCharacter = foundGame?.characters.find(c => c.name === characterName);
                setGame(foundGame);
                setCharacter(foundCharacter);
            });
    }, [title, characterName]);

    if (!character || !game) return <div>Yükleniyor...</div>;

    return (
        <div className="w-full h-[100vh] flex flex-col bg-gray-950 text-gray-300 ">
            <div className='text-center py-10 mb-10'>
                <h1 className="text-7xl special">{game.title}</h1>
            </div>
            <div className="flex p-5 cormorant text-xl">
                <div className='w-1/4 text-center'>
                    <img
                        src={`/images/${character.image}`}
                        alt={character.name}
                        className="w-full h-[500px] object-cover rounded mb-4"
                    />
                    <h2><b>Adı: </b>{character.name}</h2>
                    <p><b>Kimdir: </b>{character.role}</p>
                </div>
                <div className='w-3/4 p-5'>
                    <div className="text-2xl text-gray-100 mb-2">Polis Sorgusu:</div>
                    {character.statements.map((item, index) => (
                        <div key={index} className="mb-4 text-left border-l-4 border-gray-300 pl-3">
                            <p className="font-bold text-gray-100"> {item.question}</p>
                            <p className="text-gray-300"> {item.answer}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Characters;
