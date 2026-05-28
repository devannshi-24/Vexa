import React, { useContext, useRef } from 'react'
import { RiImageAddFill } from "react-icons/ri";
import Card from '../components/Card';
import { userDataContext } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';
import { MdKeyboardBackspace } from "react-icons/md";
function Customize() {
  const navigate = useNavigate()
  const {serverUrl,userData, setUserData,frontendImages, setFrontendImages,backendImages, setBackendImages,selectedImage, setSelectedImage}=useContext(userDataContext)
  const inputImage = useRef()
  const handleImage = (e) => {
    const file = e.target.files[0]
    setBackendImages(file)
    setFrontendImages(URL.createObjectURL(file))
  }
  return (

    <div className ='w-full h-[100vh] bg-gradient-to-t from-[#140101] to-[#03037c] flex justify-center items-center flex-col p-[20px]' >
      <MdKeyboardBackspace className='absolute top-[30px] left-[30px] text-white cursor-pointer w-[25px] h-[25px]' onClick={()=> navigate ("/")}/>
      <h1 className='text-white mb-[40px] text-[30px] text-center '>Select your <span className='text-blue-200'>Assistant Image</span></h1>
      <div className='w-full max-w-[900px] flex justify-center items-center flex-wrap gap-[15px] '>
        <Card/>
        <div className={`w-[70px] h-[140px] lg:w-[150px] lg:h-[250px] bg-[#050547] border-2 border-[#050557] rounded-2xl overflow-hidden hover:shadow-2xl hover:shadow-blue-950 cursor-pointer hover:border-white flex items-center justify-center ${selectedImage=="inputt"? "border-4 border-white shadow-2xl shadow-blue-950":null}`} onClick={() => {inputImage.current.click(); setSelectedImage("input")}}>
           {!frontendImages && <RiImageAddFill className='text-white w-[25px] h-[25px]'/>}
           {frontendImages && <img src={frontendImages} className='h-full object-cover'/>}
        </div>
        <input type="file" accept ='image/*' ref ={inputImage} hidden onChange={handleImage}/>
      </div>
      {selectedImage && <button className='min-w-[150px] h-[60px] bg-white rounded-full mt-[30px] text-black cursor-pointer font-semibold text-[19px]' onClick = {() => navigate("/customize2")}>Next</button>}
      
    </div>
  )
}

export default Customize