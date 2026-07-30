import React, { useContext, useState, useRef, useEffect } from 'react'
import { userDataContext } from '../context/UserContext'
import { MdKeyboardBackspace } from "react-icons/md";
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import axios from 'axios';
axios.defaults.withCredentials = true;

function Customize2() {
    const {userData,backendImages,selectedImage,serverUrl,setUserData} = useContext(userDataContext)
    const [assistantName, setAssistantName] = useState(userData?.assistantName || "")
    const inputRef = useRef()
    const [loading, setLoading] = useState(false)
    const navigate =  useNavigate()
    useEffect(() => { inputRef.current?.focus() }, [])

    const handleUpdateAssistant = async()=>{
      setLoading(true)
      try {
        let formData = new FormData()
        formData.append("assistantName", assistantName)
        if(backendImages){
          formData.append("assistantImage", backendImages)
        }
         else{
          formData.append("imageUrl", selectedImage)
        }
        const result = await axios.post(`${serverUrl}/api/user/update`,formData,{withCredentials:true})
        setLoading(false)
        console.log(result.data)
        setUserData(result.data.user)
        navigate("/")
      } catch (error) {
        setLoading(false)
        console.log(error)
      }
    }
    
    
  return (
    <div className ='w-full min-h-screen bg-[#05070d] text-white flex justify-center items-center flex-col p-[20px] relative overflow-hidden'>
      <div className='absolute w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-[120px] -top-40 -left-40 pointer-events-none'></div>
      <div className='absolute w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[120px] bottom-0 -right-40 pointer-events-none'></div>
      <div className='absolute w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[100px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none'></div>
        <button onClick={() => navigate("/customize")} aria-label="Go back" className='absolute top-[30px] left-[30px] w-10 h-10 flex items-center justify-center rounded-full bg-white/5 border border-white/10 text-white hover:bg-white/10 hover:border-white/20 active:scale-90 transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-blue-400/50 z-10'><MdKeyboardBackspace className='w-5 h-5'/></button>

        {(userData?.assistantImage || selectedImage) && (
         <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity:1,scale: 1 }} transition={{ duration: 0.5 }} className='relative z-10 w-[120px] h-[120px] rounded-full overflow-hidden border-2 border-white/10 shadow-2xl shadow-blue-500/20 mb-6' > <img src={userData?.assistantImage || selectedImage} alt="Your assistant" className='w-full h-full object-cover'/></motion.div>
        )}

        <h1 className='text-white mb-[40px] text-[30px] font-bold tracking-tight text-center relative z-10'>Enter your <span className='bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent'>Assistant Name</span></h1>

        <input ref={inputRef} type="text" placeholder="eg: vexa" 
         maxLength={20} className='relative z-10 w-full max-w-[500px] h-[52px] outline-none border border-white/10 bg-white/5 text-white placeholder-gray-500 px-5 rounded-full transition-all duration-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/30' required onChange={(e) => setAssistantName(e.target.value)} onKeyDown={(e) => { if (e.key === 'Enter' && assistantName.trim().length > 1) handleUpdateAssistant() }} value={assistantName}/>
        <p className='relative z-10 text-gray-500 text-xs mt-2'>{assistantName.length}/20</p>
        <div className='relative z-10 flex flex-wrap items-center   justify-center gap-2 mt-4 max-w-[500px]'>
         {['Nova', 'Aria', 'Pixel', 'Echo'].map((n) => (
          <button
            key={n}
            type="button"
            onClick={() => setAssistantName(n)}
            className='text-xs text-gray-400 bg-white/5 border border-white/10 rounded-full px-3 py-1.5 hover:bg-white/10 hover:text-white transition-colors'
          >
            {n}
          </button>
          ))}
        </div>
        {assistantName.trim().length > 1 && <motion.button initial={{ opacity: 0, y: 8 }}animate={{ opacity: 1, y: 0 }} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }} className='relative z-10 min-w-[280px] h-[52px] bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full mt-[30px] text-white cursor-pointer font-semibold text-[17px] disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2'disabled={loading} onClick={() => handleUpdateAssistant()}>
        {loading && <span className='w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin'/>}
        {loading && <span className='w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin'/>}
        {!loading? "Finally create your assistant":"Creating..."}</motion.button>}
        
    </div>
  )
}

export default Customize2