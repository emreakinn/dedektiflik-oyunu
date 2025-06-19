import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'
import Clues from './Clues';

function Game() {

    const { id } = useParams();
    const [game, setGame] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        fetch('/data.json')
            .then(res => res.json())
            .then(data => {
                const foundGame = data.senarios.find(s => s.id === parseInt(id));
                setGame(foundGame);
            });
    }, [id]);

    if (!game) return <div>Yükleniyor...</div>;

    const handleConfirm = () => {
        setShowModal(false);
        const killerId = game.solution[0].killerId;
        navigate(`/oyun/${game.id}/cozum/${killerId}`);
    };

    const handleCancel = () => {
        setShowModal(false);
    };

    return (
        <div className="p-6 text-center">
            <h1 className="text-2xl font-bold">{game.title}</h1>
            <p><b>Olay:</b> {game.description}</p>
            <p><b>Ölüm Saati:</b> {game.timeOfDeath}</p>
            <p><b>Ölüm Sebebi:</b> {game.causeOfDeath}</p>
            <h1 className='text-5xl'>Şüpheliler</h1>
            <div className='flex flex-wrap gap-5 justify-between p-5'>
                {game.characters.map((character => (
                    <div className='w-[30%] p-3 bg-gray-200' key={character.id}>
                        <img className='w-full h-[500px]' src={`/images/${character.image}`} alt={character.name} />
                        <p><b>Adı:</b> {character.name}</p>
                        <Link to={`/oyun/${game.id}/${character.id}`}>
                            <button className="bg-gray-600 text-white w-50 px-4 py-2 rounded cursor-pointer">
                                İncele
                            </button>
                        </Link>
                    </div>
                )))}
            </div>
            <h1 className='text-5xl'>İpuçları</h1>
            <Clues
                game={game}
            />
            <h1 className="text-5xl">
                Oyunu Bitir
            </h1>
            <div>
                {game.solution.map((killer => (
                    <div className='p-3' key={killer.killerId}>
                        <button
                            onClick={() => {
                                setShowModal(true);
                            }}
                            className="bg-gray-600 text-white px-6 py-2 rounded cursor-pointer"
                        >
                            Katili Öğren
                        </button>
                    </div>
                )))}
            </div>
            {showModal && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 z-50">
                    <div className="bg-white p-6 rounded-lg w-90 text-center">
                        <h2 className="text-xl font-bold mb-4">Emin misiniz?</h2>
                        <p className="mb-6">Katili öğrenmek üzeresiniz.</p>
                        <div className="flex justify-evenly">
                            <button
                                onClick={handleConfirm}
                                className="bg-green-600 text-white px-4 py-2 rounded cursor-pointer"
                            >
                                Evet
                            </button>
                            <button
                                onClick={handleCancel}
                                className="bg-gray-400 text-white px-4 py-2 rounded cursor-pointer"
                            >
                                İptal
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div >
    )
}

export default Game