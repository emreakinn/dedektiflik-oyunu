import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter, Route, Router, Routes } from "react-router-dom";
import Game from './game/Game.jsx';
import Characters from './game/Characters.jsx';
import Solution from './game/Solution.jsx';
import Main from './game/Main.jsx';
import Suspects from './game/Suspects.jsx';
import Clues from './game/Clues.jsx';

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/game" element={<Main />} />
      <Route path="/game/:title" element={<Game />} />
      <Route path="/game/:title/suspects" element={<Suspects />} />
      <Route path="/game/:title/suspects/character/:characterName" element={<Characters />} />
      <Route path="/game/:title/clues" element={<Clues />} />
      <Route path="/game/:title/katil/:katilId" element={<Solution />} />
    </Routes>
  </BrowserRouter>
)
