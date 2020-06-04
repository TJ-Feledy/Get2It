import React from 'react'
import { Link } from 'react-router-dom'
import EditTaskList from '../editTask/EditTask'

const EditTaskModal = ({ location }) => {
  const { state = {} } = location
  const { modal } = state
  
  const modalClass = modal ? 'editModal' : undefined
// console.log('props');
  return (
    <div className={modalClass}>
      {modal && <Link className='closeLink' to='/taskList'>Close</Link>}
      <div className='reUseModal' >
        <EditTaskList />
      </div>
    </div>
  )
}

export default EditTaskModal