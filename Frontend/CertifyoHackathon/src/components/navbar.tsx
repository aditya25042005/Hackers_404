import { useEffect, useState } from 'react'
import '../static/navbar.css'
import logo from './cropped_image.png'
import { NavLink, Link, useNavigate } from 'react-router-dom'
import { useUser } from '../context/UserContext'
import axios from 'axios'

const Navbar: React.FC = () => {

  const navigate = useNavigate()
    const { user, setUser } = useUser()

    const handleLogout=async()=>{
      try{
        await axios.get("https://hackers-404-5.onrender.com/user/logout",{
          withCredentials:true
        });
      setUser(null)
      //localStorage.removeItem('userEmail') // clear cache;

      navigate('/login')
      }catch(err){
        console.log(err)
      }
      
    }

  const [isMobile, setIsMobile] = useState(false)
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 370)
    }
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const [isCompact, setIsCompact] = useState(false)
  useEffect(() => {
    const handleResize = () => {
      setIsCompact(window.innerWidth <= 750)
    }
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const handleChange=(e:React.ChangeEvent<HTMLSelectElement>)=>{
    navigate(`/${e.target.value}`)
  }

  return (
    <>
    <div className="navbar">
      <div className="logo" onClick={() => navigate('/')}>
        <img src={logo} alt="" />
      </div>
      <div className='basic'>
        {isMobile ? (
          <select  onChange={handleChange} className="bg-black text-white border border-white px-2 py-1 rounded appearance-none">
            <option disabled selected value="More">More</option>
            <option value="about">About</option>
            <option value="contact">Our Vision</option>
          </select>
        ) : (<>
          <NavLink to='/about' className={({ isActive }) =>
            isActive ? "text-orange-500 font-semibold" : "text-white hover:text-red-500 transition-colors duration-200"
          }>About</NavLink>
          <NavLink
            to="/contact"
            className={({ isActive }) =>
              isActive ? "text-orange-500 font-semibold ml-4" : "text-white hover:text-red-500 transition-colors duration-200"
            }
          >
            Our Vison
          </NavLink>
        </>)
        }
      </div>
      <div className='btns'>
       { user?(
         <>
               <button
                onClick={()=>navigate('/botchat')}
                className="bg-red-600 text-white px-4 py-2 rounded-full cursor-pointer mx-2"
              >
                Chat
              </button>
              {!isCompact && (
                <span className="text-white px-4 py-2">{user.email}</span>
              )}
              <button
                onClick={handleLogout}
                className="border border-red-500 text-red-500 px-4 py-2 rounded-full cursor-pointer mx-2"
              >
                Logout
              </button>
            </>
       ):(<>
       <Link to="/login" className="bg-red-600 text-white px-4 py-2 rounded-full cursor-pointer mx-2">
          Login
        </Link>
        <Link to="/register" className="border border-red-500 text-red-500 px-4 py-2 rounded-full cursor-pointer mx-2">
          Register
        </Link>
        </>)}
      </div>
    </div>
    <div className='fakeNav'></div>
    </>
  )
}

export default Navbar

