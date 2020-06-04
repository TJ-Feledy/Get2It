import React from 'react'
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { updateUser } from '../../actions.js'
import './Profile.css'

class Profile extends React.Component {
  constructor(props) {
    super(props)

    const { username } = this.props.userData

    this.state = {
      username: username,
    }
  }

  updatedProfile = evt => {
    evt.preventDefault()

    const payload = {
      id: this.props.userID,
      username: this.state.username,
      // password: this.props.userData.password
    }

    const id = this.props.userID

    this.props.updateUser(payload, id)
    setTimeout(() => {
      this.props.history.push('/')
    }, 200)
  }

  handleChange = evt => {
    evt.preventDefault()

    this.setState({
      [evt.target.name]: evt.target.value
    })
  }

  render() {
    const { username } = this.state;
    const { isLoading, error } = this.props;

    return (
      <div className="profile">
        <h3 className="pageTitle">{this.props.userData.username}</h3>
        <i className="fas fa-user-circle profileImg"></i>
        <form className="registerForm proForm" onSubmit={this.updatedProfile}>
          {error && <p className="error">{error}</p>}

          <div className="inputContainer">
            <label to="username">
              <i id="registerIcon" className="far fa-user-circle"></i>
            </label>
            <input
              type="text"
              id="username"
              name="username"
              placeholder="Username"
              value={username}
              onChange={this.handleChange}
              required
            />
            <br />
          </div>

          {isLoading ? (
            <p>Saving changes, please wait...</p>
          ) : (
            <button className="registerButton" type="submit">
              Update Profile
            </button>
          )}
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  userData: state.userData,
  userID: state.userID,
});

const mapDispatchToProps = {
  updateUser,
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Profile));