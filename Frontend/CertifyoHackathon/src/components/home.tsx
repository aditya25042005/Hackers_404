import Navbar from "./navbar"
import Footer from "./Footer"
import Testimonial from "./Testimonial"
import OtherProducts from "./OtherProducts"
import { useUser } from "../context/UserContext"
import { useNavigate } from "react-router-dom"
import BotDesc from "./BotDesc"
import '../static/home.css'


const Home: React.FC = () => {

  const navigate=useNavigate()
  const {user}=useUser()
  const handleUse = () => {
    if(user){
      navigate('/usecouncellor')
    }else{
      navigate('login')
    }
  }

  return (
    <div className="page-container">
      <Navbar />
      <div className="content-wrap">
        <BotDesc/>
        <div className="max-w-xl mx-auto bg-white my-5 rounded-xl shadow-lg overflow-hidden md:flex hover:shadow-2xl transition duration-300">
          <div className="md:flex-shrink-0">
            {/* <img
          className="h-48 w-full object-cover md:w-48"
          src="https://via.placeholder.com/300x200?text=Current+AI+Tool"
          alt="Current AI Product"
        /> */}
          </div>
          <div className="p-6">
            <h2 className="text-2xl font-bold text-gray-900">AI Career Counselor Bot</h2>
            <p className="mt-2 text-gray-600 text-sm">
              Our latest AI-powered tool helps users by providing an AI-driven chatbot that asks a few questions about user interests and suggests career
              paths, skills to learn, and personalized learning resources.
            </p>
            <button onClick={handleUse} className="mt-4 px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600 transition">
              Use
            </button>
          </div>
        </div>
        <OtherProducts />
        <Testimonial />
      </div>
      <Footer />
    </div>
  )
}

export default Home
