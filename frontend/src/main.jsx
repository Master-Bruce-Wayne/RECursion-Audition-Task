import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Route,Routes, BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
// pages
import Home from './pages/Home.jsx'
import Login from './pages/Login.jsx'
import SignUp from './pages/SignUp.jsx'
import Connect4 from './pages/Connect4.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route>
          <Route path='/' element={<Home/>} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<SignUp/>} />
          <Route path='/connect4' element={<Connect4 />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
