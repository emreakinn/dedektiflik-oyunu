import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';

function Solution() {

    const { title, katilId } = useParams();
    const [killer, setKiller] = useState(null);
    const [explanation, setExplanation] = useState("");
    const [game, setGame] = useState(null);

    useEffect(() => {
        fetch('/data.json')
            .then(res => res.json())
            .then(data => {
                const foundGame = data.senarios.find(s => s.title === title);
                const foundCharacter = foundGame?.characters.find(c => c.id === parseInt(katilId));
                const foundExplanation = foundGame.solution.find(s => s.killerId === parseInt(katilId));
                setGame(foundGame);
                setKiller(foundCharacter);
                setExplanation(foundExplanation?.explanation);
            });
    }, [title, katilId]);

    if (!killer || !game || !explanation) return <div>Yükleniyor...</div>;

    return (
        <div className="w-full h-[100vh] flex flex-col gap-3 bg-gray-950 text-gray-300 text-center">
            <div className="text-5xl special py-10 mb-10">{game.title}</div>
            <h1 className="text-3xl special text-red-700 mb-4">Katil Açığa Çıktı!</h1>
            <img src={`/images/${killer.image}`} alt={killer.name} className="mx-auto w-48 h-48 object-cover rounded-full" />
            <h2 className="text-4xl font-bold special">{killer.name}</h2>
            <p className="text-2xl max-w-xl mx-auto cormorant">{explanation}</p>
        </div>
    )
}

export default Solution