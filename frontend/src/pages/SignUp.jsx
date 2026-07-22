import React, { useContext, useState } from 'react'
import bg from '../assets/authbg.jpeg'
import { IoEyeSharp } from "react-icons/io5";
import { FaEyeSlash } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import { userDataContext } from '../context/UserContext';
import axios from 'axios';

function SignUp() {
  const [showPassword, setShowPassword] = React.useState(false);
  const {serverUrl,userData, setUserData} = useContext(userDataContext)
  const navigate = useNavigate();
  const [nameTouched, setNameTouched] = useState(false);
  const [emailTouched, setEmailTouched] = useState(false);
  const [passwordTouched, setPasswordTouched] = useState(false);
  const [err, setErr] = useState('')
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [loading, setLoading] = useState(false);
  const [password, setPassword] = React.useState('');
  const handleSignUp = async(e) => {
    e.preventDefault();
    setErr("")
    setLoading(true);
    try{
        
        let result = await axios.post(`${serverUrl}/api/auth/signup`,{
            name,email,password
        },{withCredentials:true})
        setUserData(result.data)
        setLoading(false);
        navigate("/customize")
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
    <form className='w-[90%] min-h-[450px] h-auto max-w-[500px] ... px-[20px] py-[30px]' onSubmit={handleSignUp}>
        <h1 className='text-white text-[30px] font-semibold mb-[30px]'>Register to <span className='text-blue-400'>Virtual Assistant</span></h1>
        <label className='text-white text-sm self-start ml-2'>Name</label>
        <input type="text" placeholder="Enter your name" className='w-full h-[60px] outline-none border-2 border-white/40 bg-white/10 text-white placeholder-gray-300 px-[20px] py-[10px] rounded-full transition-all duration-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/30' required onChange={(e) => setName(e.target.value)} onBlur={() => setNameTouched(true)} value={name}/>
        <label className='text-white text-sm self-start ml-2'>Email</label>
        <label className='text-white text-sm self-start ml-2'>Password</label>
        <input type="email" placeholder="Email" className='w-full h-[60px] outline-none border-2 border-white/40 bg-white/10 text-white placeholder-gray-300 px-[20px] py-[10px] rounded-full transition-all duration-200' required onChange={(e) => setEmail(e.target.value)} onBlur={() => setEmailTouched(true)} value={email}/>
        <div className='w-full h-[60px] border-2 border-white/40 bg-white/10 text-white rounded-full relative text-[18px] focus-within:border-blue-400 focus-within:ring-2 focus-within:ring-blue-400/30'>
            <input type={showPassword ? "text" : "password"} placeholder='password' className='w-full h-full rounded-full outline-none bg-transparent placeholder-gray-300 px-[20px] py-[10px]' required onChange={(e) => setPassword(e.target.value)} onBlur={() => setPasswordTouched(true)} value={password}/>
            <button type="button" aria-label={showPassword ? "Hide password" : "Show password"} onClick={() => setShowPassword(!showPassword)} className='absolute top-[18px] right-[20px] focus:outline-none focus:ring-2 focus:ring-blue-400/50 rounded-full'>{showPassword ? <FaEyeSlash className='w-[25px] h-[25px] text-white'/> : <IoEyeSharp className='w-[25px] h-[25px] text-white'/>}</button>
        </div>
        {err.length >0 && (<div className='w-full bg-red-500/10 border border-red-500 text-red-400 text-sm rounded-lg px-4 py-2'> {err}</div>)}
        <button className='min-w-[150px] h-[60px] bg-white rounded-full mt-[30px] text-black font-semibold text-[19px] hover:bg-gray-100 active:scale-95 transition-all duration-150 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2' disabled = {loading}> {loading ? "Signing Up..." : "Sign Up"}
        </button>
        <p className='text-white text-[18px] cursor-pointer mb-[15px]' onClick={() => navigate("/signin")}>Already have an account ? <span className='text-blue-400'>Sign In</span></p>
    </form>
    </div>
  )
}

export default SignUp