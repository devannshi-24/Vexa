import React, { useContext, useState } from 'react'
import bg from '../assets/authbg.jpeg'
import { IoEyeSharp } from "react-icons/io5";
import { FaEyeSlash } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import { userDataContext } from '../context/UserContext';
import axios from 'axios';

function SignIn() {
  const [showPassword, setShowPassword] = React.useState(false);
  const {serverUrl,userData,setUserData} = useContext(userDataContext)
  const navigate = useNavigate();
  const [err, setErr] = useState('')
  const [email, setEmail] = React.useState('');
  const [loading, setLoading] = useState(false);
  const [password, setPassword] = React.useState('');
  const handleSignIn = async(e) => {
    e.preventDefault();
    setErr("")
    setLoading(true);
    try{
        
        let result = await axios.post(`${serverUrl}/api/auth/signin`,{
            email,password
        },{withCredentials:true})
        setUserData(result.data)
        setLoading(false);
        navigate("/")
    }
    catch(error){
        console.log(error);
        setUserData(null)
        setLoading(false);
        setErr(error.response.data.message)
    }
  }
  return (
    <div className='w-full h-screen bg-contain bg-center bg-no-repeat bg-[#7da0d8] flex justify-center items-center' style={{backgroundImage:`url(${bg})`}} >
    <form className='w-[90%] h-[450px] max-w-[500px] bg-[#00000000] backdrop-blur shadow-lg shadow-blue-850 -translate-y-10 flex flex-col items-center justify-center gap-[20px] px-[20px]' onSubmit={handleSignIn}>
        <h1 className='text-white text-[30px] font-semibold mb-[30px]'>Sign In to <span className='text-blue-400'>Virtual Assistant</span></h1>
        <input type="email" placeholder="Email" className='w-full h-[60px] outline-none border-2 border-white bg-transparent text-white placeholder-gray-300 px-[20px] py-[10px] rounded-full' required onChange={(e) => setEmail(e.target.value)} value={email}/>
        <div className='w-full h-[60px] border-2 border-white bg-transparent text-white rounded-full  relative text-[18px]'>
            <input type={showPassword ? "text" : "password"} placeholder='password' className='w-full h-full rounded-full outline-none bg-transparent placeholder-gray-300 px-[20px] py-[10px]' required onChange={(e) => setPassword(e.target.value)} value={password}/>
            {!showPassword && <IoEyeSharp className='absolute top-[18px] right-[20px] w-[25px] h-[25px] cursor-pointer text-[white]' onClick={() => setShowPassword(true)}/>}
            {showPassword && <FaEyeSlash className='absolute top-[18px] right-[20px] w-[25px] h-[25px] cursor-pointer text-[white]' onClick={() => setShowPassword(false)}/>}
            
        </div>
        {err.length >0 && <p className='text-red-500 text-[16px]'>*{err}</p>}
        <button className='min-w-[150px] h-[60px] bg-white rounded-full mt-[30px] text-black font-semibold text-[19px]' disabled = {loading}> {loading ? "Signing In..." : "Sign In"}

        </button>
        <p className='text-white text-[18px] cursor-pointer mb-[15px]' onClick={() => navigate("/signup")}>Want to create a new account? <span className='text-blue-400'>Sign Up</span></p>
    </form>
    </div>
  )
}

export default SignIn