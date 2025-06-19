import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter, Route, Router, Routes } from "react-router-dom";
import Game from './components/Game.jsx';
import Characters from './components/Characters.jsx';
import Solution from './components/Solution.jsx';

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/oyun/:id" element={<Game />} />
      <Route path="/oyun/:oyunId/:karakterId" element={<Characters />} />
      <Route path="/oyun/:oyunId/cozum/:katilId" element={<Solution />} />
    </Routes>
  </BrowserRouter>
)
