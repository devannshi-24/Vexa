import React, { useContext, useState } from 'react'
import { userDataContext } from '../context/UserContext'
import { MdKeyboardBackspace } from "react-icons/md";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Customize2() {
    const {userData,backendImages,selectedImage,serverUrl,setUserData} = useContext(userDataContext)
    const [assistantName, setAssistantName] = useState(userData?.assistantName || "")
    const [loading, setLoading] = useState(false)
    const navigate =  useNavigate()
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
        setUserData(result.data)
        navigate("/")
      } catch (error) {
        setLoading(false)
        console.log(error)
      }
    }
    
  return (
    <div className ='w-full h-[100vh] bg-gradient-to-t from-[#140101] to-[#03037c] flex justify-center items-center flex-col p-[20px] relative'>
        <MdKeyboardBackspace className='absolute top-[30px] left-[30px] text-white cursor-pointer w-[25px] h-[25px]' onClick={()=> navigate ("/customize")}/>
        <h1 className='text-white mb-[40px] text-[30px] text-center '>Enter your <span className='text-blue-200'>Assistant Name</span></h1>
        <input type="text" placeholder="eg: vexa" className='w-full max-w-[600px] h-[60px] outline-none border-2 border-white bg-transparent text-white placeholder-gray-300 px-[20px] py-[10px] rounded-full' required onChange={(e) => setAssistantName(e.target.value)} value={assistantName}/>
        {assistantName && <button className='min-w-[300px] h-[60px] bg-white mt-[30px] text-black cursor-pointer font-semibold text-[19px]' disabled={loading} onClick = {() => {
          handleUpdateAssistant()
        }}>{!loading? "Finally create your assistant":"loading..."}</button>}
        
    </div>
  )
}

export default Customize2