import React from 'react'
import logo from '../Images/logo.png'
import './Spinner.css'

function Spinner() {
  return (
    <div className='spinnerContainer'><img className='spinnerImg' src={logo} alt='' /></div>
  )
}

export default Spinner