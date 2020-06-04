import React from 'react'
import { Link } from 'react-router-dom'
import NewTask from '../NewTask/NewTask.js'

const TaskModal = ({ location }) => {
  const { state = {} } = location
  const { modal } = state
  
  const modalClass = modal ? 'taskModal' : undefined

  return (
    <div className={modalClass}>
      {modal && <Link className='closeLink' to='/'>Close</Link>}
      <div className='newModal'>
        <NewTask />
      </div>
    </div>
  )
}

export default TaskModal