import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Route,Routes, BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.jsx'

// components
import Navbar from './components/Navbar.jsx'

// pages
import Home from './pages/Home.jsx'
import Login from './pages/Login.jsx'
import SignUp from './pages/SignUp.jsx'
import Connect4 from './pages/Connect4.jsx'

// contexts
import { UserProvider } from './context/UserContext.jsx'
import { GameProvider } from './context/GameContext.jsx'

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <UserProvider>
        <GameProvider>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<SignUp />} />
            <Route path="/connect4" element={<Connect4 />} />
          </Routes>
        </GameProvider>
      </UserProvider>
    </BrowserRouter>
  </StrictMode>
);
