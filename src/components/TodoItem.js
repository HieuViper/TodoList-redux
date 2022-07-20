import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { FaTrash, FaPen } from 'react-icons/fa'
import { deleteTodo, updateTodo } from '../slices/todoSlice'
import TodoModal from './TodoModal'
import CheckButton from './CheckButton'
import { motion } from 'framer-motion'

const child = {
  hidden: { y: 100, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
  },
};

const TodoItem = ({ todo }) => {
  const dispatch = useDispatch()
  const [updateModelOpen, setUpdateModalOpen] = useState(false)
  const [checked, setChecked] = useState(false)

  useEffect(() => {
    if(todo.status === 'complete') {
      setChecked(true)
    }
    else{
      setChecked(false)
    }
  }, [todo.status])

  const handleDelete = () => {
    dispatch(deleteTodo(todo.id))
  }

  const handleUpdate = () => {
    setUpdateModalOpen(true)
  }

  const handleCheck = () => {
    setChecked(!checked)
    dispatch(updateTodo({
      ...todo,
      status: checked ? 'incomplete' : 'complete'
    }))
  }

  return (
    <>
      <motion.div className='wrapper w-full ' variants={child}>
        <div className="wrapper-item bg-white p-4 mt-2 flex items-center justify-between rounded-lg">
          <CheckButton checked={checked} handleCheck={handleCheck}/>
          <div className="item flex-1 pl-5">
            <p className={todo.status === 'complete' ? 'line-through' : ''}>{todo.title}</p>
            <p className=''>{todo.time}</p>
          </div>
          <div className="icon flex items-center gap-4">
            <button className='p-2 bg-slate-200 rounded-md hover:bg-slate-300 transition-all duration-200' onClick={handleDelete}><FaTrash /></button>
            <button className='p-2 bg-slate-200 rounded-md hover:bg-slate-300 transition-all duration-200' onClick={handleUpdate}><FaPen /></button>
          </div>
        </div>
      </motion.div>
      <TodoModal modalOpen={updateModelOpen} setModalOpen={setUpdateModalOpen} todo={todo} type='update' />
    </>
  )
}

export default TodoItem