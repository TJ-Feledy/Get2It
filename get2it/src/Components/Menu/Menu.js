import React from 'react';
import { withRouter } from 'react-router-dom'
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { connect } from 'react-redux'
import logo from '../Images/logo.png'
import './Menu.css'

class Menu extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      userData: this.props.userData,
      dropdownOpen: false,
    }
  }
  
  toggle = () => {
    
    this.setState({
      dropdownOpen: !this.state.dropdownOpen,
      userData: this.props.userData
    })
  }

  logout = evt => {
    evt.preventDefault()
    
    localStorage.removeItem('token')
    this.props.history.push('/login')
  }
  
  home = evt => {
    evt.preventDefault()
    
    if (this.props.location.pathname === '/') {
      return
    }else {
      this.props.history.push('/')
    }
  }

  completeTasks = this.props.userTasks.filter(task => task.status === true)
  incompleteTasks = this.props.userTasks.filter(task => task.status === false)

  render() {
    // console.log(this.completeTasks)
    return (
      <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
        <DropdownToggle className="dropButton">
          <i className="fas fa-bars fa-lg"></i>
        </DropdownToggle>
        <DropdownMenu>
          <DropdownItem header>
            <img className="menuLogo" src={logo} alt="Get2It" />{" "}
            {this.state.userData.username}
          </DropdownItem>
          <DropdownItem divider />
          <DropdownItem onClick={this.home}>
            <i className="fas fa-home icon"></i>Home
          </DropdownItem>
          <DropdownItem
            onClick={evt => {
              evt.preventDefault();
              this.props.history.push("/profile");
            }}
          >
            <i className="fas fa-user-circle icon"></i>
            Profile
          </DropdownItem>
          <DropdownItem
            onClick={evt => {
              evt.preventDefault();
              this.props.history.push("/NewTask");
            }}
          >
            <i className="fas fa-plus-circle icon"></i>Add a Task
          </DropdownItem>
          <DropdownItem
            onClick={evt => {
              evt.preventDefault();
              this.props.history.push("/taskList");
            }}
          >
            <i className="fas fa-list-alt icon"></i>
            <div className="yourTasks">
              Your Tasks
              <div className="menuTaskCount">{this.incompleteTasks.length}</div>
            </div>
          </DropdownItem>
          <DropdownItem
            onClick={evt => {
              evt.preventDefault();
              this.props.history.push("/CompletedTaskList");
            }}
          >
            <i className="fas fa-check-circle icon"></i>
            <div className="yourTasks">
              Completed Tasks
              <div className="menuTaskCount">{this.completeTasks.length}</div>
            </div>
          </DropdownItem>
          <DropdownItem divider />
          <DropdownItem onClick={this.logout}>
            <i className="fas fa-sign-out-alt icon"></i>Logout
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    );
  }
}

const mapStateToProps = state => ({
  userData: state.userData,
  userTasks: state.userTasks,
  userID: state.userID,
})

export default withRouter(connect(mapStateToProps)(Menu))