import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'
import Clues from '../components/Clues';
import Modal from '../components/modal';

function Game() {

    const { title } = useParams();
    const [game, setGame] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        fetch('/data.json')
            .then(res => res.json())
            .then(data => {
                const foundGame = data.senarios.find(s => s.title === title);
                setGame(foundGame);
            });
    }, [title]);

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
        <div className="w-full h-[100vh] flex flex-col bg-gray-950 text-gray-300 text-center">
            <div className="text-2xl font-bold py-10 mb-10">{game.title}</div>
            <div className='w-full flex'>
                <div className='w-[60%] p-10 flex flex-col gap-6 items-center justify-start'>
                    <p><b>Olay:</b> {game.description}</p>
                    <p><b>Ölüm Saati:</b> {game.timeOfDeath}</p>
                    <p><b>Ölüm Sebebi:</b> {game.causeOfDeath}</p>
                </div>
                <div className='w-[40%] flex gap-10 items-center justify-center'>
                    <button className='w-[40%] h-[600px] py-28 border-2'>ŞÜPHELİLER</button>
                    <button className='w-[40%] h-[600px] py-28 border-2'>İPUÇLARI</button>
                </div>
            </div>
            <div className='flex flex-wrap gap-5 justify-between p-5'>
                {game.characters.map((character => (
                    <div className='w-[0%] p-3 bg-gray-200' key={character.id}>
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
            <Modal
                showModal={showModal}
                handleConfirm={handleConfirm}
                handleCancel={handleCancel}
            />
        </div >
    )
}

export default Game