import { useState } from 'react'
import { Routes, Route, BrowserRouter } from 'react-router-dom'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'
// pages
import Home from './pages/Home.jsx'
import Login from './pages/Login.jsx'
import SignUp from './pages/SignUp.jsx'
import Connect4 from './pages/Connect4.jsx'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <main>
        <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<SignUp />} />
          <Route path='/connect4' element={<Connect4 />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
