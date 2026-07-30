import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FiArrowRight } from "react-icons/fi";
import { BsStars, BsShieldLock, BsLightningCharge, BsGlobe2, BsMic } from "react-icons/bs";

const AVATAR_COLORS = [
  { id: 'blue', from: '#4f7fff', to: '#22d3ee' },
  { id: 'violet', from: '#8b5cf6', to: '#ec4899' },
  { id: 'emerald', from: '#10b981', to: '#22d3ee' },
  { id: 'amber', from: '#f59e0b', to: '#f43f5e' },
]

const containerStagger = {hidden: {},show: { transition: { staggerChildren: 0.12 } }}

const fadeUp = {hidden: { opacity: 0, y: 16 },show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }}

function LandingPage() {
  const navigate = useNavigate()
  const [assistantName, setAssistantName] = useState('')
  const [avatarColor, setAvatarColor] = useState(AVATAR_COLORS[0])

  const displayName = assistantName.trim() || 'Nova'

  const features = [
    { icon: <BsStars className='w-5 h-5' />, title: "Name it, style it", desc: "Give your assistant a name and a look that's actually yours — not a mascot picked for you." },
    { icon: <BsLightningCharge className='w-5 h-5' />, title: "Instant responses", desc: "Sub-second replies with streaming audio, so conversations feel natural instead of laggy." },
    { icon: <BsMic className='w-5 h-5' />, title: "Real-time transcript", desc: "Live captions and searchable history for every conversation you have." },
  ]

  return (
    <div className='w-full min-h-screen bg-[#05070d] text-white overflow-x-hidden'>

      <div className='absolute w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-[120px] -top-40 -left-40 pointer-events-none'></div>
      <div className='absolute w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[120px] top-[400px] -right-40 pointer-events-none'></div>

      <nav className='relative z-10 w-full flex items-center justify-between px-[6%] py-6 max-w-[1400px] mx-auto'>
        <span className='font-semibold text-lg tracking-tight'>Virtual Assistant</span>
        <div className='flex items-center gap-4'>
          <button onClick={() => navigate('/signin')} className='text-gray-300 hover:text-white text-sm transition-colors'>Sign In</button>
          <motion.button whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }} onClick={() => navigate('/signup')} className='bg-gradient-to-r from-blue-500 to-cyan-400 text-white text-sm font-medium px-5 py-2.5 rounded-full'>
            Get Started
          </motion.button>
        </div>
      </nav>

      <motion.section
        variants={containerStagger}
        initial="hidden"
        animate="show"
        className='relative z-10 max-w-[900px] mx-auto text-center px-[6%] pt-16 pb-8'
      >
        <motion.div variants={fadeUp} className='inline-flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-4 py-1.5 text-xs text-gray-300 mb-8'>
          <BsStars className='w-3.5 h-3.5 text-cyan-400' />
          Build an assistant that's actually yours
        </motion.div>
        <motion.h1 variants={fadeUp} className='text-[42px] sm:text-[56px] leading-[1.1] font-bold tracking-tight mb-6'>
          Your Assistant. <br className='hidden sm:block' />
          <span className='bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent'>Your Name. Your Look.</span>
        </motion.h1>
        <motion.p variants={fadeUp} className='text-gray-400 text-lg max-w-[560px] mx-auto mb-10'>
          Most assistants come with a name you didn't pick. Choose a name, choose a face, and talk to something that feels like your own.
        </motion.p>
        <motion.div variants={fadeUp} className='flex items-center justify-center gap-4'>
          <motion.button whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }} onClick={() => navigate('/signup')} className='flex items-center gap-2 bg-gradient-to-r from-blue-500 to-cyan-400 text-white font-medium px-6 py-3.5 rounded-full'>
            Get Started <FiArrowRight />
          </motion.button>
          <motion.button whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }} onClick={() => navigate('/signin')} className='bg-white/5 border border-white/10 text-white font-medium px-6 py-3.5 rounded-full'>
            I have an account
          </motion.button>
        </motion.div>
      </motion.section>

      <motion.section
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.5, ease: "easeOut" }}
        className='relative z-10 max-w-[720px] mx-auto px-[6%] pb-24'
      >
        <div className='bg-gradient-to-br from-blue-950/60 to-[#0a1428] border border-white/10 rounded-3xl p-8 shadow-2xl shadow-black/40'>
          <p className='text-xs uppercase tracking-wider text-gray-400 mb-5 text-center'>Try naming yours</p>
          <div className='flex flex-col items-center gap-5'>
            <motion.div
              key={displayName + avatarColor.id}
              initial={{ scale: 0.85, opacity: 0.6 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.25 }}
              className='w-20 h-20 rounded-full flex items-center justify-center text-2xl font-bold shadow-lg'
              style={{ background: `linear-gradient(135deg, ${avatarColor.from}, ${avatarColor.to})` }}
            >
              {displayName.charAt(0).toUpperCase()}
            </motion.div>

            <input
              type="text"
              value={assistantName}
              onChange={(e) => setAssistantName(e.target.value)}
              placeholder="Nova"
              maxLength={16}
              className='w-full max-w-[280px] text-center bg-white/5 border border-white/10 rounded-full px-5 py-2.5 text-white placeholder-gray-500 outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400/30 transition-all duration-200'
            />

            <div className='flex items-center gap-3'>
              {AVATAR_COLORS.map((c) => (
                <motion.button
                  key={c.id}
                  onClick={() => setAvatarColor(c)}
                  aria-label={`Choose ${c.id} theme`}
                  whileHover={{ scale: 1.12 }}
                  whileTap={{ scale: 0.94 }}
                  className='relative w-7 h-7 rounded-full'
                  style={{ background: `linear-gradient(135deg, ${c.from}, ${c.to})` }}
                >
                  {avatarColor.id === c.id && (
                    <motion.div
                      layoutId="avatarRing"
                      className='absolute -inset-1 rounded-full ring-2 ring-white/70'
                      transition={{ type: "spring", stiffness: 400, damping: 25 }}
                    />
                  )}
                </motion.button>
              ))}
            </div>

            <div className='w-full bg-black/30 border border-white/5 rounded-2xl px-5 py-4 mt-2 text-sm text-gray-300'>
              <span className='text-white font-medium'>"Hey {displayName},"</span> what's on my calendar today?
            </div>
          </div>
        </div>
      </motion.section>

      <section className='relative z-10 max-w-[1100px] mx-auto px-[6%] pb-24'>
        <motion.h2
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5 }}
          className='text-3xl sm:text-4xl font-bold text-center mb-3 tracking-tight'
        >
          Built for the way you think
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className='text-gray-400 text-center mb-14'
        >
          A premium voice experience that combines cutting-edge AI with a face you chose.
        </motion.p>
        <motion.div
          variants={containerStagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5'
        >
          {features.map((f, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              whileHover={{ y: -4 }}
              className='bg-white/[0.03] border border-white/10 rounded-2xl p-6 hover:bg-white/[0.05] transition-colors'
            >
              <div className='w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center mb-4'>
                {f.icon}
              </div>
              <h3 className='font-semibold text-lg mb-2'>{f.title}</h3>
              <p className='text-gray-400 text-sm leading-relaxed'>{f.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.6 }}
        className='relative z-10 max-w-[1100px] mx-auto px-[6%] pb-28'
      >
        <div className='bg-gradient-to-br from-blue-600/30 to-cyan-500/20 border border-white/10 rounded-3xl px-8 py-16 text-center'>
          <h2 className='text-3xl sm:text-4xl font-bold mb-3 tracking-tight'>Ready to meet your assistant?</h2>
          <p className='text-gray-300 mb-8'>Pick a name, pick a face, and start your first conversation in under a minute.</p>
          <div className='flex items-center justify-center gap-4'>
            <motion.button whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }} onClick={() => navigate('/signup')} className='flex items-center gap-2 bg-white text-black font-semibold px-6 py-3.5 rounded-full'>
              Get Started Free <FiArrowRight />
            </motion.button>
            <motion.button whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }} onClick={() => navigate('/signin')} className='bg-white/10 border border-white/20 text-white font-medium px-6 py-3.5 rounded-full'>
              I have an account
            </motion.button>
          </div>
        </div>
      </motion.section>

    </div>
  )
}

export default LandingPage