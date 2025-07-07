import './App.css'
import { Link } from 'react-router-dom'


function App() {

  return (
    <div className='w-full h-[100vh] bg-[url(./assets/background.png)] bg-no-repeat bg-cover bg-center special'>
      <div className='flex flex-col gap-10 pl-50 pt-70 text-gray-300 font-bold'>
        <div className='text-7xl'> DEDECTİVE GAME</div>
        <div className='text-5xl'>
          <Link to={`/game`}>
            <button className="text-gray-300 cursor-pointer">
              OYUNA BAŞLA
            </button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default App
