import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';

function Solution() {

    const { oyunId, katilId } = useParams();
    const [killer, setKiller] = useState(null);
    const [explanation, setExplanation] = useState("");
    const [game, setGame] = useState(null);

    useEffect(() => {
        fetch('/data.json')
            .then(res => res.json())
            .then(data => {
                const foundGame = data.senarios.find(s => s.id === parseInt(oyunId));
                const foundCharacter = foundGame.characters.find(c => c.id === parseInt(katilId));
                const foundExplanation = foundGame.solution.find(s => s.killerId === parseInt(katilId));
                setGame(foundGame);
                setKiller(foundCharacter);
                setExplanation(foundExplanation?.explanation);
            });
    }, [oyunId, katilId]);

    if (!killer || !game || !explanation) return <div>Yükleniyor...</div>;

    return (
        <div className="p-6 text-center">
            <h1 className="text-3xl font-bold text-red-700 mb-4">Katil Açığa Çıktı!</h1>
            <img src={`/images/${killer.image}`} alt={killer.name} className="mx-auto w-48 h-48 object-cover rounded-full" />
            <h2 className="text-2xl font-bold">{killer.name}</h2>
            <p className="text-lg max-w-xl mx-auto">{explanation}</p>
        </div>
    )
}

export default Solution