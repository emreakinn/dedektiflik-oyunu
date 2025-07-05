import './App.css'
import { Link } from 'react-router-dom'


function App() {

  return (
    <div className='w-full h-[100vh] bg-[url(./assets/background.png)] bg-no-repeat bg-cover bg-center'>
      <div className='flex flex-col gap-10 p-80 text-6xl text-gray-300 font-bold'>
        <div> DEDECTİVE GAME</div>
        <div>
          <Link to={`/game`}>
            <button className="text-gray-300 cursor-pointer">
              Oyun Başla
            </button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default App
