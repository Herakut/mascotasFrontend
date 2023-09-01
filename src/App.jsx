
import { Route, Routes } from 'react-router-dom'
import './App.css'
import Navbar from './components/Navbar'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Home from './pages/Home'
import Perfil from './pages/Perfil'
import Error from './pages/Error'
import NotFound from './pages/NotFound'

function App() {
  

  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={ <Home />} /> 
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/perfil" element={<Perfil />} />

        <Route path="/error" element={<Error />} />
        <Route path="/*" element={<NotFound />} />



      </Routes>
    </>
  )
}

export default App
