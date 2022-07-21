import React from 'react'
import { useSelector } from 'react-redux'
import TodoItem from './TodoItem'
import { AnimatePresence, motion } from 'framer-motion'
import NoItemFound from './NoItemFound';

const container = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};
const child = {
  hidden: { y: 100, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
  },
};

const AppContent = () => {
  const todoList = useSelector((state) => state.todo.todoList)
  const sortedTodoList = [...todoList]
  const filterStatus = useSelector(state => state.todo.filterStatus)
  const searchTodo = useSelector(state => state.todo.searchTodo)
  sortedTodoList.sort((a, b) => new Date(b.time) - new Date(a.time))

  const filteredTodoList = sortedTodoList.filter((item) => {
    if (filterStatus === 'all') {
      return true && item.title.includes(searchTodo)
    }
    return item.status === filterStatus && item.title.includes(searchTodo)
  })

  return (
    <motion.div className=''
      variants={container}
      initial="hidden"
      animate="visible"
    >
      <AnimatePresence>
      {
        filteredTodoList && filteredTodoList.length > 0 ?
          filteredTodoList.map((todo) => <TodoItem key={todo.id} todo={todo} />) :
          <motion.div variants={child}>
            <NoItemFound />
          </motion.div>
      }
      </AnimatePresence>
    </motion.div>
  )
}

export default AppContent