import Login from './components/login'
import Home from './components/home'
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom'
import './App.css'
import Register from './components/Register'
import About from './components/About'
import Contacts from './components/Contacts'


function App() {

  return (
    <>
    <Router>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/about' element={<About/>}/>
        <Route path='/contact' element={<Contacts/>}/>
        <Route path='/usecouncellor' element={<Contacts/>}/>
      </Routes>
    </Router>
    </>
  )
}

export default App
