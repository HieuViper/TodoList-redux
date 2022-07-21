import React, { useEffect } from 'react'

const Priority = ({ priority, checked }) => {
  let temp = ''
  if (priority === 'High' && checked === false) {
    temp = '#ef4444'
  }
  if (priority === 'Medium' && checked === false) {
    temp = '#eab308'
  }
  if (priority === 'Low' && checked === false) {
    temp = '#22c55e'
  }
  if (priority === 'High' && checked === true) {
    temp = '#fca5a5'
  }
  if (priority === 'Medium' && checked === true) {
    temp = '#fef08a'
  }
  if (priority === 'Low' && checked === true) {
    temp = '#86efac'
  }
  
  const bgPriority = {
    backgroundColor: `${temp}`
  };

  return (
    <>
      <div className="priority ml-9 flex-1 select-none">
        <div
          id='priority-status'
          style={bgPriority}
          className={`wrapper-priority px-2 py-1 rounded-lg text-white text-sm font-semibold inline-block 
            ${checked ? 'line-through decoration-slate-400 decoration-2' : ''}
          `}>
          <span>{priority}</span>
        </div>
      </div>
    </>
  )
}

export default Priority