
import { Route, Routes } from 'react-router-dom'
import './App.css'
import Navbar from './components/Navbar'
import Login from './pages/Login'
import Home from './pages/Home'
import Perfil from './pages/Perfil'
import Error from './pages/Error'
import NotFound from './pages/NotFound'
import UserSignup from './pages/UserSignup'
import AnimalSignup from './pages/AnimalSignup'
import AnimalDetails from './pages/AnimalDetails'

function App() {
  

  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={ <Home />} /> 
        <Route path="/login" element={<Login />} />
        <Route path="/user-signup" element={<UserSignup />} />
        <Route path="/animal-signup" element={<AnimalSignup />} />
        <Route path="/perfil" element={<Perfil />} />
        <Route path="/animal-edit" element={<AnimalDetails />} />

        <Route path="/error" element={<Error />} />
        <Route path="/*" element={<NotFound />} />



      </Routes>
    </>
  )
}

export default App
