import React, { useContext, useEffect, useRef, useState } from 'react'
import { userDataContext } from '../context/UserContext'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
axios.defaults.withCredentials = true;
import { RiMenu3Fill } from "react-icons/ri";
import { ImCross } from "react-icons/im";
import { BsMic, BsMicMute } from "react-icons/bs";
import { motion, AnimatePresence } from 'framer-motion';
import aiImg from '../assets/ai.gif'
import userImg from '../assets/user.gif'

function Home() {
  const {userData,serverUrl,setUserData,getGeminiResponse}=useContext(userDataContext)
  const navigate=useNavigate()
  const [listening, setListening] = useState(false)
  const[userText, setUserText] = useState("")
  const[aiText, setAiText] = useState("")
  const isSpeakingRef = useRef(false)
  const recognitionRef = useRef(null) 
  const [ham, setHam] = useState(false)
  const isRecognizingRef = useRef(false)
  const synth = window.speechSynthesis

  const handleLogout = async() => {
    try {
     const result = await axios.get(`${serverUrl}/api/auth/logout`,{withCredentials:true})
      setUserData(null)
     navigate("/signin")
    } catch (error) {
      setUserData(null)
      console.log(error)
    }
  }

  const startRecognition = () => {
    if(!isSpeakingRef.current && !isRecognizingRef.current){
      try {
       recognitionRef.current?.start();
       console.log("Recognition requested to start");
      } catch (error) {
       if(error.name !== "error"){
        console.error("Start error: ", error);  
       }
      }
    }
  }

  const speak = (text) => {
    const utterance = new SpeechSynthesisUtterance(text)
    utterance.lang = 'hi-IN';
    const voices =window.speechSynthesis.getVoices()
    const hindiVoice = voices.find(v => v.lang === 'hi-IN');
    if (hindiVoice) {
      utterance.voice = hindiVoice;
    }
    isSpeakingRef.current = true
    utterance.onend = () => {
      setAiText("")
      isSpeakingRef.current = false
      setTimeout(()=>{
        startRecognition()
      },800)
    }
    synth.cancel()
    synth.speak(utterance)

  }
  const handleCommand = (data)=>{
    const {type,userInput,response} = data
    speak(response);
    if(type === 'google_search'){
      const query = encodeURIComponent(userInput)
      window.open(`https://www.google.com/search?q=${query}`,'_blank');
    }
    if(type === 'calculator_open'){
      window.open(`https://www.google.com/search?q=calculator`,'_blank');
    }
    if(type === 'instagram_open'){
      window.open(`https://www.instagram.com/`,'_blank');
    }
    if(type === 'facebook_open'){
      window.open(`https://www.facebook.com/`,'_blank');
    }
    if(type === 'weather_show'){
      window.open(`https://www.google.com/search?q=weather`,'_blank');
    }
    if(type === 'youtube_search' || type === 'youtube_play'){
      const query = encodeURIComponent(userInput)
      window.open(`https://www.youtube.com/results?search_query=${query}`,'_blank');
    }
  }
  useEffect(() =>{

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
    const recognition = new SpeechRecognition();

    recognition.continuous = true
    recognition.lang = 'en-US'
    recognition.interimResults = false

    recognitionRef.current = recognition

    let isMounted = true

    const startTimout = setTimeout(() => {
      if(isMounted && !isSpeakingRef.current && !isRecognizingRef.current){
        try{
          recognition.start()
          console.log("Recognition started after timeout");
        }
        catch(error){
          if(error.name !== "InvalidStateError"){
            console.log(error);
          }
        }
      }
    }, 1000)
    
    recognition.onstart = () => {
      isRecognizingRef.current = true
      setListening(true)
    }
    recognition.onend = () => {
      isRecognizingRef.current = false
      setListening(false)
      if(isMounted && !isSpeakingRef.current){
        setTimeout(() => {
          if(isMounted ){
            try{
              recognition.start()
              console.log("Recognition restarted ");
            }
            catch(error){
              if(error.name !== "InvalidStateError"){
                console.log(error);
              }
            }
          }
        },1000)
      }
    }  
  
    recognition.onerror = (event) => {
      console.warn("Recognition error: ", event.error);
      isRecognizingRef.current = false;
      setListening(false);
      if(event.error !== "aborted" && isMounted && !isSpeakingRef.current){
        setTimeout(() => {
          if(isMounted){
            try{
              recognition.start()
              console.log("Recognition restarted after error");
            }
            catch(error){
              if(error.name !== "InvalidStateError"){
                console.log(error);
              }
            }
          }
        },1000);  
      }
    }
    recognition.onresult = async (e) =>{
      const transcript = e.results[e.results.length - 1][0].transcript.trim()
      console.log(transcript)
      if(true){
        setAiText("")
        setUserText(transcript)
        recognition.stop()
        isRecognizingRef.current = false
        setListening(false)
         const data = await getGeminiResponse(transcript)
         handleCommand(data)
         setAiText(data.response)
         setUserText("")
      }
    }
    
      const greetings = new SpeechSynthesisUtterance(`Hello ${userData.name}, I am your assistant. How can I help you?`)
      greetings.lang ='hi-IN'
      window.speechSynthesis.speak(greetings)
    
    return () => {  
      isMounted = false
      clearTimeout(startTimout)    
      recognition.stop()
      setListening(false)
      isRecognizingRef.current = false
    }
},[])

  const isSpeaking = Boolean(aiText)
  const statusLabel = isSpeaking ? "Speaking" : listening ? "Listening" : "Idle"
  const statusColor = isSpeaking ? "from-cyan-400 to-blue-400" : listening ? "from-emerald-400 to-cyan-400" : "from-gray-500 to-gray-600"

  return (
    <div className='w-full min-h-screen bg-[#05070d] text-white flex justify-center items-center flex-col relative overflow-hidden'>
      <div className='absolute w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-[120px] -top-40 -left-40 pointer-events-none'></div>
      <div className='absolute w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[120px] bottom-0 -right-40 pointer-events-none'></div>
      <div className='absolute w-[400px] h-[400px] bg-blue-500/5 rounded-full blur-[100px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none'></div>

      <div className='absolute top-0 left-0 w-full flex items-center justify-between px-[6%] py-6 z-20'>
        <span className='font-semibold text-lg tracking-tight'>
          Virtual <span className='bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent'>Assistant</span>
        </span>
         <div className='hidden lg:flex items-center gap-3'>
          <button
            onClick={() => navigate("/customize")}
            className='text-sm font-medium px-5 py-2.5 rounded-full bg-white/5 border border-white/10 text-white hover:bg-white/10 hover:border-white/20 transition-colors'
          >
            Customize Assistant
          </button>
          <button onClick={handleLogout} className='text-sm font-medium px-5 py-2.5 rounded-full bg-gradient-to-r from-blue-500 to-cyan-400 text-white hover:opacity-90 transition-opacity'> Log Out</button>
        </div>
        <button aria-label="Open menu" onClick={() => setHam(true)} className='lg:hidden w-10 h-10 flex items-center justify-center rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition-colors'><RiMenu3Fill className='w-5 h-5 text-white'/></button>
      </div>

      <AnimatePresence>
        {ham && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className='lg:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-30'
            onClick={() => setHam(false)}
          >
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 32 }}
              onClick={(e) => e.stopPropagation()}
              className='absolute right-0 top-0 h-full w-[80%] max-w-[340px] bg-white/[0.04] border-l border-white/10 backdrop-blur-xl p-6 flex flex-col gap-6'
            >
              <button
                aria-label="Close menu"
                onClick={() => setHam(false)}
                className='self-end w-9 h-9 flex items-center justify-center rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition-colors'
              >
                <ImCross className='w-4 h-4 text-white'/>
              </button>
 
              <div className='flex flex-col gap-3'>
                <button
                  onClick={handleLogout}
                  className='w-full h-[52px] rounded-full bg-gradient-to-r from-blue-500 to-cyan-400 text-white font-semibold text-[16px]'
                >
                  Log Out
                </button>
                <button
                  onClick={() => navigate("/customize")}
                  className='w-full h-[52px] rounded-full bg-white/5 border border-white/10 text-white font-semibold text-[16px] hover:bg-white/10 transition-colors'
                >
                  Customize your Assistant
                </button>
              </div>
 
              <div className='w-full h-[1px] bg-white/10'></div>
 
              <h2 className='text-gray-300 text-sm font-semibold tracking-wide uppercase'>History</h2>
              <div className='flex-1 overflow-y-auto flex flex-col gap-2 pr-1'>
                {userData.history?.length ? (
                  userData.history.map((his, i) => (
                    <div key={i} className='text-gray-300 text-sm bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3 truncate'>
                      {his}
                    </div>
                  ))
                ) : (
                  <p className='text-gray-500 text-sm'>No conversations yet.</p>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className='relative z-10 w-full max-w-[420px] mx-4 bg-white/[0.03] border border-white/10 backdrop-blur-md rounded-3xl shadow-2xl shadow-black/40 flex flex-col items-center gap-6 px-8 py-10 mt-16'
      >
        {/* status pill */}
        <div className='flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-4 py-1.5'>
          <span className={`w-2 h-2 rounded-full bg-gradient-to-r ${statusColor} ${listening || isSpeaking ? 'animate-pulse' : ''}`}></span>
          <span className='text-xs text-gray-300 tracking-wide'>{statusLabel}</span>
        </div>
 
        {/* assistant avatar with animated glow ring */}
        <div className='relative w-[180px] h-[180px] flex items-center justify-center'>
          <motion.div
            animate={{
              opacity: listening || isSpeaking ? [0.4, 0.8, 0.4] : 0.25,
              scale: listening || isSpeaking ? [1, 1.08, 1] : 1,
            }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            className='absolute inset-0 rounded-full bg-gradient-to-br from-blue-500 to-cyan-400 blur-2xl'
          ></motion.div>
          <div className='relative w-[150px] h-[150px] rounded-full overflow-hidden border-2 border-white/10 shadow-2xl shadow-blue-500/20 bg-black/30'>
            <img src={userData?.assistantImage} alt="Your assistant" className='w-full h-full object-cover'/>
          </div>
          <div className='absolute -bottom-1 -right-1 w-9 h-9 rounded-full bg-[#05070d] border border-white/10 flex items-center justify-center'>
            {listening ? <BsMic className='w-4 h-4 text-cyan-300'/> : <BsMicMute className='w-4 h-4 text-gray-500'/>}
          </div>
        </div>
 
        <h1 className='text-[22px] font-bold tracking-tight text-center'>
          I'm <span className='bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent'>{userData?.assistantName}</span>
        </h1>
 
        {/* speaking / listening indicator image, softened into the theme */}
        <div className='w-[120px] h-[120px] rounded-2xl overflow-hidden border border-white/10 bg-black/20 flex items-center justify-center'>
          {!aiText && <img src={userImg} alt="" className='w-full h-full object-cover'/>}
          {aiText && <img src={aiImg} alt="" className='w-full h-full object-cover'/>}
        </div>
 
        {/* live transcript */}
        <div className='w-full min-h-[64px] bg-black/30 border border-white/5 rounded-2xl px-5 py-4 flex items-center justify-center text-center'>
          <AnimatePresence mode="wait">
            {(userText || aiText) ? (
              <motion.p
                key={userText || aiText}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.25 }}
                className='text-gray-200 text-[15px] leading-relaxed'
              >
                {userText ? userText : aiText}
              </motion.p>
            ) : (
              <p className='text-gray-500 text-sm'>Say something to get started...</p>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
     
      )}

export default Home