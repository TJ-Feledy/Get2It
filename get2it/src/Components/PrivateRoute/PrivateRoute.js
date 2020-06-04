import React from 'react'
import { Route, Redirect } from 'react-router-dom'
// import { connect } from 'react-redux'

function PrivateRoute(props) {
  const {
    component: Component,
    ...rest
  } = props

  return (

    <Route {...rest} render={(props) => {

      const token = localStorage.getItem('token')

      return token
        ? <Component {...props} />
        : <Redirect to="/login" />
    }} />
  )
}

// const mapStateToProps = state => ({
//   userData: state.userData,
// })

export default /*connect(mapStateToProps)*/(PrivateRoute)