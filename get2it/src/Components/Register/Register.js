import React from 'react'
import './Register.css'
import { withRouter, Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { createUser } from '../../actions'
import logo from '../Images/logo.png'
import Spinner from '../Spinner/Spinner.js'

class Register extends React.Component {
  constructor() {
    super()
    this.state = {
      username: '',
      password: '',
      error: null
    }
  }

  handleChange = (evt) => {
    evt.preventDefault()

    this.setState({
      [evt.target.name]: evt.target.value,
    })
  }

  handleSubmit = (evt) => {
    evt.preventDefault()

    const { username, password } = this.state

    this.props.createUser(username, password)
      .then(() => {
        !this.props.error ?
          this.props.history.push('/onboarding') :
          this.setState({
            error: 'Invalid Credentials'
          })
      })
      .catch((err) => {
        console.error(err)
      })
  }
  render() {
    console.log(this.props)
    const { username, password } = this.state
    const { isLoading } = this.props

    return (

      <>
        {isLoading ? <Spinner /> :
          <div className='register'>
            <h3 className='pageTitle'>Sign up</h3>
            <img className='registerLogo' src={logo} alt='get2it'/>
            <form className='registerForm' onSubmit={this.handleSubmit}>
              {this.state.error === 'Invalid Credentials' ? <p className='error'>Username already exists!</p> : null}

              <div className='inputContainer'>
                <label to='username'><i id='registerIcon' className="far fa-user-circle"></i></label>
                <input type='text' id='username' name='username' placeholder='Username' value={username} onChange={this.handleChange} required /><br />
              </div>
              <div className='inputContainer'>
                <label to='password'><i id='registerIcon' className="fas fa-unlock-alt"></i></label>
                <input type='password' id='password' name='password' placeholder='Password' value={password} onChange={this.handleChange} required /><br />
              </div>

              <button className='registerButton' type='submit'>Create Account</button>
            </form>
            <p className='loginMessage'>ALREADY HAVE AN ACCOUNT? <Link className='loginLink' to='/login'> SIGN IN</Link></p>
          </div>
        }
      </>

    )
  }
}

const mapStateToProps = (state) => ({
  isLoading: state.isLoading,
  error: state.error,
})

const mapDispatchToProps = {
  createUser,
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Register)
)