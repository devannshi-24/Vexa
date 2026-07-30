import React, { useContext, useState } from 'react'
import { IoEyeSharp } from "react-icons/io5";
import { FaEyeSlash } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import { userDataContext } from '../context/UserContext';
import axios from 'axios';
import robot1 from '../assets/robot1.jpeg'
import { motion } from 'framer-motion';

function SignIn() {
  const [showPassword, setShowPassword] = React.useState(false);
  const {serverUrl,userData,setUserData} = useContext(userDataContext)
  const navigate = useNavigate();
  const [err, setErr] = useState('')
  const [email, setEmail] = React.useState('');
  const [emailTouched, setEmailTouched] = useState(false);
  const [passwordTouched, setPasswordTouched] = useState(false);
  const [loading, setLoading] = useState(false);
  const [password, setPassword] = React.useState('');
  const handleSignIn = async(e) => {
    e.preventDefault();
    setErr("")
    setLoading(true);
    try{
        
        let result = await axios.post(`${serverUrl}/api/auth/login`,{
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
        setErr(error.response.data.message || "Something went wrong")
    }
  }
  return (
    <div className='w-full h-screen bg-[#05070d] text-white flex justify-center items-center relative overflow-hidden'>
  <div className='absolute w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-[120px] -top-40 -left-40 pointer-events-none'></div>
  <div className='absolute w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[120px] bottom-0 -right-40 pointer-events-none'></div>
  <div className='relative z-10 w-full max-w-[1100px] flex items-center justify-between gap-10'>

    <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, ease: "easeOut" }} className='hidden lg:flex flex-col items-start flex-1 relative'>
      <div className='relative w-full max-w-[560px] aspect-[4/5]' style={{ maskImage: 'linear-gradient(to right, black 75%, transparent 100%), linear-gradient(to bottom, transparent 0%, black 10%, black 90%, transparent 100%)', maskComposite: 'intersect', WebkitMaskImage: 'linear-gradient(to right, black 75%, transparent 100%), linear-gradient(to bottom, transparent 0%, black 10%, black 90%, transparent 100%)', WebkitMaskComposite: 'source-in' }}>
        <img src={robot1} alt="Virtual Assistant robot" className='w-full h-full object-cover object-left mix-blend-screen'/>
      </div>
    </motion.div>

    <motion.form initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, ease: "easeOut" }}
      className='relative z-10 w-full max-w-[440px] bg-white/[0.03] border border-white/10 backdrop-blur-md rounded-3xl shadow-2xl shadow-black/40 flex flex-col items-center gap-5 px-8 py-10'
      onSubmit={handleSignIn}>
        <h1 className='text-white text-[28px] font-bold tracking-tight mb-2 text-center'>Sign In to <span className='bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent'>Virtual Assistant</span></h1>
        <div className='w-full flex flex-col gap-1'>
         <label className='text-gray-400 text-sm ml-2'>Email</label>
         <input type="email" placeholder="Email" className='w-full h-[52px] outline-none border border-white/10 bg-white/5 text-white placeholder-gray-500 px-5 rounded-full transition-all duration-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/30' required onChange={(e) => setEmail(e.target.value)} onBlur={() => setEmailTouched(true)} value={email}/>
         {emailTouched && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) && email.length > 0 && (<p className='text-red-400 text-xs ml-2 mt-1'>Please enter a valid email</p>)}
        </div>
        <div className='w-full flex flex-col gap-1'>
          <label className='text-gray-400 text-sm ml-2'>Password</label>
          <div className='w-full h-[52px] border border-white/10 bg-white/5 text-white rounded-full relative transition-all duration-200 focus-within:border-blue-400 focus-within:ring-2 focus-within:ring-blue-400/30'>
          <input type={showPassword ? "text" : "password"} placeholder='Password' className='w-full h-full rounded-full outline-none bg-transparent placeholder-gray-500 px-5' required onChange={(e) => setPassword(e.target.value)} onBlur={() => setPasswordTouched(true)} value={password}/>
          <button type="button" aria-label={showPassword ? "Hide password" : "Show password"} onClick={() => setShowPassword(!showPassword)} className='absolute top-[14px] right-[18px] text-gray-400 hover:text-white transition-colors focus:outline-none'>{showPassword ? <FaEyeSlash className='w-[20px] h-[20px]'/> : <IoEyeSharp className='w-[20px] h-[20px]'/>}</button>
          </div>
          {passwordTouched && password.length < 6 && password.length > 0 && (<p className='text-red-400 text-xs ml-2'>Password must be at least 6 characters</p>)}
        </div>
        {err.length >0 && (<div className='w-full bg-red-500/10 border border-red-500 text-red-400 text-sm rounded-lg px-4 py-2'>{err}</div>)}
        <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }} className='w-full max-w-[220px] h-[52px] bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full mt-2 text-white font-semibold text-[17px] disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2' disabled={loading}>{loading ? "Signing In..." : "Sign In"}</motion.button>
        <p className='text-gray-400 text-sm cursor-pointer' onClick={() => navigate("/signup")}>Want to create a new account? <span className='text-blue-400 hover:text-blue-300'>Sign Up</span></p>
    </motion.form>
    </div>
    </div>
  )
}

export default SignIn