import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { addTodo, updateTodo } from '../slices/todoSlice'
import { v4 as uuid } from 'uuid'
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';

const dropIn = {
  hidden: {
    y: "-60vh",
    opacity: 0,
  },
  visible: {
    y: "0",
    opacity: 1,
    transition: {
      duration: 0.1,
      type: "spring",
      damping: 25,
      stiffness: 500,
    },
  },
  exit: {
    y: "100vh",
    opacity: 0,
  },
};

const ToDoModal = ({ modalOpen, setModalOpen, type, todo }) => {
  const [title, setTitle] = useState('')
  const [status, setStatus] = useState('incomplete')
  const [priority, setPriority] = useState('High')
  const dispatch = useDispatch()

  useEffect(() => {
    if (todo && type === 'update') {
      setTitle(todo.title)
      setStatus(todo.status)
    }
    else {
      setTitle('')
      setStatus('incomplete')
    }
  }, [modalOpen, type, todo])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (title === '') {
      toast.error('Task should be filled fully !!!')
      return
    }
    if (title && status) {
      if (type === 'add') {
        dispatch(
          addTodo({
            id: uuid(),
            title,
            status,
            priority,
            time: new Date().toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true, year: 'numeric', month: 'numeric', day: 'numeric' })
          })
        )
        toast.success('Task Added Successfully !!!')
      }
      if (type === 'update') {
        if (todo.title !== title || todo.status !== status || todo.priority !== priority) {
          dispatch(
            updateTodo({
              ...todo,
              title,
              status,
              priority
            })
          )
          toast.success('Task Updated Successfully !!!')
        }
        else {
          toast.error('Nothing Changed !')
          return
        }
      }
      setModalOpen(false)
    }
  }
  return (
    <div>
      {modalOpen && (
        <motion.div 
          id="defaultModal"
          tabIndex="-1"
          className="bg-opacity-50 bg-black overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 w-full md:inset-0 h-modal md:h-full justify-center items-center flex"
          aria-modal="true"
          role="dialog"
          initial={{opacity: 0}}
          animate={{opacity: 1}}
          exit={{opacity: 0}}
        >
          <motion.div
            className="relative p-4 w-full max-w-2xl h-full md:h-auto"
            variants={dropIn}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <form action="" onSubmit={handleSubmit}>
              <div className="relative bg-[#ecedf6] rounded-lg shadow ">
                <div className="flex justify-between items-start p-4 rounded-t border-b ">
                  <h3 className="text-xl font-semibold text-[#646681] ">
                    {type === 'update' ? 'Update' : 'Add'} TODO
                  </h3>
                  <button onClick={() => setModalOpen(false)} tabIndex={0} role="button" type="button" className="text-gray-400 bg-transparent hover:bg-red-500 transition-all ease-in duration-150 hover:text-white rounded-lg text-sm p-1.5 ml-auto inline-flex items-center" data-modal-toggle="defaultModal">
                    <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                    <span className="sr-only">Close modal</span>
                  </button>
                </div>

                <div className="p-6 space-y-6">
                  <div className="">
                    <label className='block text-[#646681]' htmlFor="title">
                      Title
                    </label>
                    <input className='p-3 w-full mt-2 rounded-md' type="text" name="" id="title" value={title} onChange={(e) => setTitle(e.target.value)} />
                  </div>
                  <div className="">
                    <label className='text-[#646681] block' htmlFor="status">
                      Status
                    </label>
                    <select className='p-3 w-full mt-2 rounded-md' name="" id="status" defaultValue="incomplete" value={status} onChange={(e) => setStatus(e.target.value)}>
                      <option value="incomplete">Incomplete</option>
                      <option value="complete">Complete</option>
                    </select>
                  </div>
                  <div className="">
                    <label className='text-[#646681] block' htmlFor="priorities">
                      Priority
                    </label>
                    <select className='p-3 w-full mt-2 rounded-md' name="" id="priorities" defaultValue="High" value={priority} onChange={(e) => setPriority(e.target.value)}>
                      <option value="High">High</option>
                      <option value="Medium">Medium</option>
                      <option value="Low">Low</option>
                    </select>
                  </div>
                </div>

                <div className="flex items-center p-6 space-x-2 rounded-b">
                  <button data-modal-toggle="defaultModal" type="submit" className="text-white bg-[#646ff0]  focus:ring-4 focus:outline-none focus:ring-blue-300 hover:opacity-80 transition-all duration-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center ">{type === 'update' ? 'Update' : 'Add'} Task</button>
                  <button data-modal-toggle="defaultModal" type="button" tabIndex={0} role="button" onClick={() => setModalOpen(false)} className="text-[#646681] bg-[#cccdde]  focus:ring-4 focus:outline-none focus:ring-blue-300 hover:opacity-80 transition-all duration-200 rounded-lg border  text-sm font-medium px-5 py-2.5 ">Cancel</button>
                </div>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </div>
  )
}

export default ToDoModal