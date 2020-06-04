import React from 'react'
import { Link } from 'react-router-dom'
import EditCompletedTaskList from '../editCompletedTask/EditTask'

const CompletedtaskModal = ({ location }) => {
  const { state = {} } = location
  const { modal } = state
  
  const modalClass = modal ? 'editModal' : undefined
// console.log('props');
  return (
    <div className={modalClass}>
      {modal && <Link className='closeLink' to='/CompletedTaskList'>Close</Link>}
      <div className='reUseModal'>
        <EditCompletedTaskList />
      </div>
    </div>
  )
}

export default CompletedtaskModal