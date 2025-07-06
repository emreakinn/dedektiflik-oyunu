import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'
import Modal from '../components/modal';

function Game() {

    const { title, suspects } = useParams();
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
    }, [title, suspects]);

    if (!game) return <div>Yükleniyor...</div>;

    const handleConfirm = () => {
        setShowModal(false);
        const killerId = game.solution[0].killerId;
        navigate(`/game/${title}/katil/${killerId}`);
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
                    <Link className='w-[40%] h-[600px] py-28 border-2' to={`/game/${title}/suspects`}>
                        <button>ŞÜPHELİLER</button>
                    </Link>
                    <Link className='w-[40%] h-[600px] py-28 border-2' to={`/game/${title}/clues`}>
                        <button>İPUÇLARI</button>
                    </Link>
                </div>
            </div>
            <div>

                <button
                    onClick={() => {
                        setShowModal(true);
                    }}
                    className="bg-gray-600 text-white px-6 py-2 rounded cursor-pointer"
                >
                    Katili Öğren
                </button>
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