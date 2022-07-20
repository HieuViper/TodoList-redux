import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { updateFilterStatus } from '../slices/todoSlice'
import TodoModal from './TodoModal'
import { motion } from 'framer-motion'

const AppHeader = () => {
  const dispatch = useDispatch()
  const [modalOpen, setModalOpen] = useState(false)
  const initialFilterStatusValue = useSelector(state => state.todo.filterStatus)
  const [filterStatus, setFilterStatus] = useState(initialFilterStatusValue);
  const item = {
    hidden: { opacity: 0 },
    appear: { opacity: 1 }
  }
  const handleFilter = (e) => {
    setFilterStatus(e.target.value)
    dispatch(updateFilterStatus(e.target.value))
  }

  return (
    <div>
      <motion.div initial="hidden" animate="appear" variants={item} className='pt-[25px] flex justify-between w-full mb-5'>
        <button
          initial="hidden"
          animate="appear"
          variants={item}
          className='bg-[#d04ed6] px-5 py-3 text-white rounded-md font-semibold hover:opacity-80 transition-all duration-300'
          tabIndex={0}
          onClick={() => setModalOpen(true)}
        >
          Add Task
        </button>
        <select
          id="countries"
          onChange={handleFilter}
          className="transition-all duration-300 bg-[#A770EF] rounded-md outline-none text-white font-semibold p-3 cursor-pointer hover:opacity-80"
          value={filterStatus}
        >
          <option className='hover:bg-black' value="all">All</option>
          <option value="incomplete">Incomplete</option>
          <option value="complete">Complete</option>
        </select>
      </motion.div>
      <TodoModal modalOpen={modalOpen} setModalOpen={setModalOpen} type='add' />
    </div>
  )
}

export default AppHeader