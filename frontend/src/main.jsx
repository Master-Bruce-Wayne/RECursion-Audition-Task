import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Route,Routes, BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.jsx'

// components
import Navbar from './components/Navbar.jsx'
import Footer from './components/Footer.jsx'

// pages
import Home from './pages/Home.jsx'
import Login from './pages/Login.jsx'
import SignUp from './pages/SignUp.jsx'
import Connect4 from './pages/Connect4.jsx'

// contexts
import { UserProvider } from './context/UserContext.jsx'
import { GameProvider } from './context/GameContext.jsx'
import Ludo from './pages/Ludo.jsx'
import Games from './pages/Games.jsx'
import AddGame from './pages/AddGame.jsx'
import NotFound from './pages/NotFound.jsx'

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <UserProvider>
        <GameProvider>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/games" element={<Games />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<SignUp />} />
            <Route path="/games/CONN-4" element={<Connect4 />} />
            <Route path="/games/addGame" element={<AddGame />} />
            <Route path="/games/LUDO" element={<Ludo />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          <Footer />
        </GameProvider>
      </UserProvider>
    </BrowserRouter>
  </StrictMode>
);
