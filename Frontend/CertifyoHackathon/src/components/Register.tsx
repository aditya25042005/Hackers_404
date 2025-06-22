import axios from "axios";
import { useState} from "react";
import { Link,useNavigate } from "react-router-dom"


const Register:React.FC = () => {

    const [name,setName]=useState('');
    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');
    const [otp,setOtp]=useState('');
    const [otpSent, setOtpSent] = useState(false); 
    const [loading, setLoading] = useState(false);

    const navigate=useNavigate()

    const handleSubmit=async(e:React.FormEvent)=>{
        e.preventDefault()
        setLoading(true)

        try{
            if(!otpSent){
                await axios.post("https://hackers-404-7w9h.onrender.com/user/createuser",{
                    name,
                    email,
                    password,
                }, {
    withCredentials: true,  // <--- Add this here
  })
                alert("OTP sent to your email. check in your spam folder if not found in inbox");
                setOtpSent(true);
            }
            else
            {
                await axios.post("https://hackers-404-7w9h.onrender.com/user/createuser/otp", {
                    name,
                    email,
                    password,
                    otp,
                });
                navigate('/login')
            }
        }catch (err) {
            alert(`error occured ${err}`);
        } finally {
            setLoading(false);
        }

    }

    return (
        <div>
            <div className="flex flex-wrap">
                <div className="flex w-full flex-col md:w-1/2">
                    <div className="flex justify-center pt-12 md:-mb-24 md:justify-start md:pl-12">
                        <a href="#" className="border-b-gray-700 border-b-4 pb-2 text-2xl font-bold text-gray-900"> Register . </a>
                    </div>
                    <div className="lg:w-[28rem] mx-auto my-auto flex flex-col justify-center pt-8 md:justify-start md:px-6 md:pt-0">
                        <p className="text-left text-3xl font-bold">Thankyou for Choosing Us</p>
                        <p className="mt-2 text-left text-gray-500">Kindly enter your details.</p>
                        {/* <button className="-2 mt-8 flex items-center justify-center rounded-md border px-4 py-1 outline-none ring-gray-400 ring-offset-2 transition focus:ring-2 hover:border-transparent hover:bg-black hover:text-white"><img className="mr-2 h-5" src="https://static.cdnlogo.com/logos/g/35/google-icon.svg" /> Log in with Google</button>
                        <div className="relative mt-8 flex h-px place-items-center bg-gray-200">
                            <div className="absolute left-1/2 h-6 w-14 -translate-x-1/2 bg-white text-center text-sm text-gray-500">or</div>
                        </div> */}

                        <form onSubmit={handleSubmit} className="flex flex-col pt-3 md:pt-8">
                            <div className="flex flex-col pt-4">
                                <div className="focus-within:border-b-gray-500 relative flex overflow-hidden border-b-2 transition">
                                    <input value={name} onChange={(e)=>setName(e.target.value)} type="text" id="login-name" className="w-full flex-1 appearance-none border-gray-300 bg-white px-4 py-2 text-base text-gray-700 placeholder-gray-400 focus:outline-none" placeholder="Name"  required/>
                                </div>
                            </div>
                            <div className="flex flex-col pt-4">
                                <div className="focus-within:border-b-gray-500 relative flex overflow-hidden border-b-2 transition">
                                    <input value={email} onChange={(e)=>setEmail(e.target.value)} type="email" id="login-email" className="w-full flex-1 appearance-none border-gray-300 bg-white px-4 py-2 text-base text-gray-700 placeholder-gray-400 focus:outline-none" placeholder="Email" required />
                                </div>
                            </div>
                            <div className="flex flex-col pt-4">
                                <div className="focus-within:border-b-gray-500 relative flex overflow-hidden border-b-2 transition">
                                    <input value={password} onChange={(e)=>setPassword(e.target.value)} type="password" id="login-password" className="w-full flex-1 appearance-none border-gray-300 bg-white px-4 py-2 text-base text-gray-700 placeholder-gray-400 focus:outline-none" placeholder="Set your Password(minimum length is 4)"  required/>
                                </div>
                            </div>
                            <div className="mb-12 flex flex-col pt-4">
                                <div className="focus-within:border-b-gray-500 relative flex overflow-hidden border-b-2 transition">
                                    <input value={otp} onChange={(e) => setOtp(e.target.value)} type="text" disabled={!otpSent} className="w-full flex-1 appearance-none border-gray-300 bg-white px-4 py-2 text-base text-gray-700 placeholder-gray-400 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50" placeholder="OTP (check in spam folder)" />
                                </div>
                            </div>
                            <button type="submit" className="w-full rounded-lg bg-gray-900 px-4 py-2 text-center text-base font-semibold text-white shadow-md ring-gray-500 ring-offset-2 transition focus:ring-2 hover:bg-gray-700 cursor-pointer" disabled={loading}>
                                {loading ? "Processing..." : otpSent ? "Register" : "Send OTP"}
                            </button>
                        </form>
                        <div className="py-12 text-center">
                            <p className="whitespace-nowrap text-gray-600">
                                Already have an account?
                                <Link to="/login" className="underline-offset-4 font-semibold text-gray-900 underline">Sign in</Link>
                            </p>
                        </div>
                    </div>
                </div>
                <div className="pointer-events-none relative hidden h-screen select-none bg-black md:block md:w-1/2">
                    <div className="absolute bottom-0 z-10 px-8 text-white opacity-100">
                        <p className="mb-12 text-4xl font-semibold leading-10">#one<span className="text-red-600">Code</span> welcomes you to AI Career Counselor Bot</p>
                        <p className="mb-4 text-2xl font-semibold">Team Lead : Ansh Singh</p>
                        <p className="text-xl">Members : G Srishtik Sekar, Aditya Gupta , Aditya Karn </p>
                        <p className="mb-7 text-1xl opacity-70"></p>
                    </div>
                    {/* <img className="-z-1 absolute top-0 h-full w-full object-cover opacity-90" src="https://images.unsplash.com/photo-1565301660306-29e08751cc53?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80" /> */}
                </div>
            </div>

        </div>
    )
}

export default Register
