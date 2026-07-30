import React, { useContext, useRef } from 'react'
import { RiImageAddFill } from "react-icons/ri";
import Card from '../components/Card';
import { userDataContext } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';
import { MdKeyboardBackspace } from "react-icons/md";
import robot2 from '../assets/robot2.jpeg'
import robot3 from '../assets/robot3.jpeg'
import robot4 from '../assets/robot4.jpeg'
import robot5 from '../assets/robot5.jpeg'
import robot6 from '../assets/robot6.jpeg'
function Customize() {
  const navigate = useNavigate()
  const {serverUrl,userData, setUserData,frontendImages, setFrontendImages,backendImages, setBackendImages,selectedImage, setSelectedImage}=useContext(userDataContext)
  const inputImage = useRef()
  const handleImage = (e) => {
    const file = e.target.files[0]
    setBackendImages(file)
    setFrontendImages(URL.createObjectURL(file))
    setSelectedImage(null)
  }
  return (

    <div className ='w-full min-h-screen bg-[#05070d] text-white flex justify-center items-center flex-col p-[20px] relative overflow-hidden' >
      <div className='absolute w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-[120px] -top-40 -left-40 pointer-events-none'></div>
      <div className='absolute w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[120px] bottom-0 -right-40 pointer-events-none'></div>
      <button onClick={() => navigate("/")} aria-label="Go back" className='absolute top-[30px] left-[30px] w-10 h-10 flex items-center justify-center rounded-full bg-white/5 border border-white/10 text-white hover:bg-white/10 hover:border-white/20 active:scale-90 transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-blue-400/50 z-10'><MdKeyboardBackspace className='w-5 h-5'/></button>
      <h1 className='text-white mb-[40px] text-[30px] font-bold tracking-tight text-center relative z-10'>Select your <span className='bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent'>Assistant Image</span></h1>
      <div className='w-full max-w-[900px] flex justify-center items-center flex-wrap gap-[15px] '>
        <Card image = {robot2} />
         <Card image = {robot3} />
          <Card image = {robot4} />
           <Card image = {robot5} />
        <div className={`w-[70px] h-[140px] lg:w-[150px] lg:h-[250px] bg-[#050547] border-2 border-[#050557] rounded-2xl overflow-hidden hover:shadow-2xl hover:shadow-blue-950 cursor-pointer hover:border-white flex items-center justify-center ${selectedImage=="inputt"? "border-4 border-white shadow-2xl shadow-blue-950":null}`} onClick={() => {inputImage.current.click(); setSelectedImage("input")}}>
           {!frontendImages && <RiImageAddFill className='text-white w-[25px] h-[25px]'/>}
           {frontendImages && <img src={frontendImages} className='h-full object-cover'/>}
        </div>
        <input type="file" accept ='image/*' ref ={inputImage} hidden onChange={handleImage}/>
      </div>
      {selectedImage && <button className='relative z-10 min-w-[150px] h-[52px] bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full mt-[30px] text-white cursor-pointer font-semibold text-[17px] hover:opacity-90 active:scale-95 transition-all duration-150' onClick = {() => navigate("/customize2")}>Next</button>}
      
    </div>
  )
}

export default Customize