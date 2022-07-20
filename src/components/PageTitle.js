import React from 'react'
import { motion } from 'framer-motion'
// from-[#834d9b]  to-[#d04ed6]
const PageTitle = () => {
  return (
    <motion.p animate={{y: -100}} className=' my-auto font-bold text-[60px] bg-gradient-to-r bg-clip-text text-transparent 
    from-indigo-500 via-purple-500 to-indigo-500
    animate-text uppercase text-center' 
    >
      ToDo List
    </motion.p>
  )
}

export default PageTitle