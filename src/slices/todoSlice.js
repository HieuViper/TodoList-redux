import { createSlice } from "@reduxjs/toolkit";

const getInitialValue = () => {
  const localTodoList = window.localStorage.getItem('todoList')
  if (localTodoList) {
    return JSON.parse(localTodoList)
  }
  window.localStorage.setItem('todoList', JSON.stringify([]))
  return []
}

const initalValue = {
  todoList: getInitialValue(),
  filterStatus: 'all',
  searchTodo:'',
  priority:''
}

export const todoSlice = createSlice({
  name: 'todo',
  initialState: initalValue,
  reducers:{
    addTodo: (state, action) => {
      state.todoList.push(action.payload)
      const todoList = window.localStorage.getItem('todoList')
      if(todoList){
        const todoListArr = JSON.parse(todoList)
        todoListArr.push({...action.payload,})
        window.localStorage.setItem('todoList', JSON.stringify(todoListArr))
      }
      else{
        window.localStorage.setItem('todoList' , JSON.stringify([{...action.payload}]))
      }
    },
    deleteTodo: (state, action) => {
      const todoList = window.localStorage.getItem('todoList')
      if(todoList) {
        const todoListArr = JSON.parse(todoList)
        todoListArr.forEach((todo, index) => {
          if(todo.id === action.payload){
            todoListArr.splice(index, 1)
          }
        })
        window.localStorage.setItem('todoList' , JSON.stringify(todoListArr))
        state.todoList = todoListArr
      }
    },
    updateTodo: (state, action) => {
      const todoList = window.localStorage.getItem('todoList')
      if(todoList) {
        const todoListArr = JSON.parse(todoList)
        todoListArr.forEach((todo, index) => {
          if(todo.id === action.payload.id){
            todo.title = action.payload.title
            todo.status = action.payload.status
            todo.priority = action.payload.priority
          }
        })
        window.localStorage.setItem('todoList', JSON.stringify(todoListArr))
        state.todoList = todoListArr
      }
    },
    updateFilterStatus: (state, action) => {
      state.filterStatus = action.payload
    },
    updateFilterPriority: (state, action) => {
      state.priority = action.payload
    },
    searchFilterChange: (state, action) => {
      state.searchTodo = action.payload
    }
  }
})

export const {addTodo , deleteTodo, updateTodo, updateFilterStatus, updateFilterPriority, searchFilterChange} = todoSlice.actions
export default todoSlice.reducer
