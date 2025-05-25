import Login from './components/login'
import Home from './components/home'
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom'
import './App.css'
import Register from './components/Register'
import About from './components/About'
import Contacts from './components/Contacts'
// import UseAiCouncellor from './components/UseAiCouncellor'
import BotChat from './components/BotChat'


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
        <Route path='/botchat' element={<BotChat/>}/>
      </Routes>
    </Router>
    </>
  )
}

export default App
