import React from 'react'
import { motion, useMotionValue, useTransform } from 'framer-motion'

const checkedVariants = {
  initial: {
    color: 'white'
  },
  checked: {
    pathLength: 1
  },
  unchecked: {
    pathLength: 0
  }
}

const boxVariants = {
  checked: {
    background: '#9733EE',
    transition: { duration: 0.1 },
  },
  unchecked: { background: '#e2e8f0', transition: { duration: 0.1 } },
}

const CheckButton = ({ checked, handleCheck }) => {
  const pathLength = useMotionValue(0)
  const opacity = useTransform(pathLength, [0.05, 0.15], [0, 1]);

  return (
    <motion.div 
    animate={checked ? 'checked' : 'unchecked'}
    variants={boxVariants} 
    onClick={handleCheck} 
    className='hover:opacity-80 rounded-sm h-[25px] flex items-center justify-center basis-6 p-1 cursor-pointer transition-all duration-200 ease-in'>
      <motion.svg 
      className='w-[100%] h-[100%] stroke-white flex items-center justify-center' 
      viewBox="0 0 53 38" fill="none" xmlns="http://www.w3.org/2000/svg">
        <motion.path
          variants={checkedVariants}
          animate={checked ? 'checked' : 'unchecked'}
          className=''
          fill="none"
          style={{pathLength, opacity}}
          strokeMiterlimit="10"
          strokeWidth="6"
          d="M1.5 22L16 36.5L51.5 1"
          strokeLinejoin="round"
          strokeLinecap="round"
        ></motion.path>
      </motion.svg>
    </motion.div>
  )
}

export default CheckButton