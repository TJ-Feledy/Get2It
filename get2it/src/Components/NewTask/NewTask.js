
import React from "react"
import { withRouter } from "react-router-dom"
import "./NewTask.css"
import Clock from "./StartTime"
import Date from "./Date"
import EndTime from "./EndTime"
import { Dropdown, DropdownButton, Button } from "react-bootstrap"
import $ from "jquery"
import { connect } from "react-redux"
import { createTask, newStartTime } from "../../actions.js"
import moment from "moment"
import AddToCalendarBtn from "../AddCalendarBtn/AddCalendarBtn"
import Switch from 'react-toggle-switch'


class NewTask extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      icon: "",
      taskName: "",
      newError: null,
      switched: false,
      notifyOn: false,
    };

  }

  toggleSwitch = () => {
    this.setState(prevState => {
      return {
        switched: !prevState.switched
      };
    });
  };
  toggleNotify = () => {
    this.setState(prevState => {
      return {
        notifyOn: !prevState.notifyOn
      };
    });
  };

  changeHandler = evt => {
    evt.preventDefault()

    this.setState({
      [evt.target.name]: evt.target.value
    })
  }

  handleSubmit = evt => {
    evt.preventDefault();


    const { icon, taskName, notifyOn } = this.state;
    const {
      createTask,
      date,
      start_time,
      end_time,
      userData,
      error,
    } = this.props;
    const id = userData.id;


    if (start_time === "" && end_time === "") {
      // this.props.newStartTime(moment().format("h:mm a"));

      const payload = {
        task_icon: icon,
        name: taskName,
        date,
        notifyOn,
        start_time: moment().format("h:mm a"),
        end_time: moment().format("h:mm a")
      };
      // console.log(payload)

      createTask(payload, id)
        .then(() => {
          this.props.history.push("/");
        })
        .catch(err => {
          console.error(err);
          this.setState({
            newError: this.props.error
          });
        });
    } else if (end_time === "") {
      const payload = {
        task_icon: icon,
        name: taskName,
        date,
        notifyOn,
        start_time,
        end_time: moment().format("h:mm a")
      };
      console.log(payload);

      createTask(payload, id)
        .then(() => {
          this.props.history.push("/");
        })
        .catch(err => {
          console.error(err);
          this.setState({
            newError: this.props.error
          });
        });
    } else if (start_time === "") {
      const payload = {
        task_icon: icon,
        name: taskName,
        date,
        notifyOn,
        start_time: moment().format("h:mm a"),
        end_time
      };
      console.log(payload);

      createTask(payload, id)
        .then(() => {
          this.props.history.push("/");
        })
        .catch(err => {
          console.error(err);
          this.setState({
            newError: this.props.error
          });
        });
    } else {
      const payload = {
        task_icon: icon,
        name: taskName,
        date,
        notifyOn,
        start_time,
        end_time
      };
      createTask(payload, id)
        .then(() => {
          this.props.history.push("/");
        })
        .catch(err => {
          console.error(err);
          this.setState({
            newError: this.props.error
          });
        });
    }
  };

  addIconOne = event => {
    $("#iconOne").removeClass("iconOne");
    $("#iconTwo").addClass("iconTwo");
    $("#iconThree").addClass("iconThree");
    $("#iconFour").addClass("iconFour");
    $("#iconFive").addClass("iconFive");
    $("#iconSix").addClass("iconSix");
    console.log($("#iconThree"));
  };
  addIconTwo = event => {
    // console.log("yolo")

    $("#iconOne").addClass("iconOne");
    $("#iconTwo").removeClass("iconTwo");
    $("#iconThree").addClass("iconThree");
    $("#iconFour").addClass("iconFour");
    $("#iconFive").addClass("iconFive");
    $("#iconSix").addClass("iconSix");
  };
  addIconThree = event => {
    // console.log("yolo")

    $("#iconOne").addClass("iconOne");
    $("#iconTwo").addClass("iconTwo");
    $("#iconThree").removeClass("iconThree");
    $("#iconFour").addClass("iconFour");
    $("#iconFive").addClass("iconFive");
    $("#iconSix").addClass("iconSix");
  };
  addIconFour = event => {
    // console.log("yolo")

    $("#iconOne").addClass("iconOne");
    $("#iconTwo").addClass("iconTwo");
    $("#iconThree").addClass("iconThree");
    $("#iconFive").addClass("iconFive");
    $("#iconSix").addClass("iconSix");
    $("#iconFour").removeClass("iconFour");
  };
  addIconFive = event => {
    // console.log("yolo")

    $("#iconOne").addClass("iconOne")
    $("#iconTwo").addClass("iconTwo")
    $("#iconThree").addClass("iconThree")
    $("#iconFour").addClass("iconFour");
    $("#iconSix").addClass("iconSix");
    $("#iconFive").removeClass("iconFive");
  };
  addIconSix = event => {
    // console.log("yolo")

    $("#iconOne").addClass("iconOne");
    $("#iconTwo").addClass("iconTwo");
    $("#iconThree").addClass("iconThree");
    $("#iconFour").addClass("iconFour");
    $("#iconFive").addClass("iconFive");
    $("#iconSix").removeClass("iconSix");
  };


  render() {
    console.log(this.props);
    return (
      <div className="newTaskContainer">
        <br />

        <h1 className="NewTask-Tittle"> Add New Task</h1>
        {/* <hr className="line" /> */}
        <br />
        {/* <Category/> */}
        <div className="calender-date">
          <div className="datePick">
            <i className="far fa-calendar-alt fa-3x" />
          </div>
          <br />
          <br />

          <Date className="date" />
          <br />
          <br />
        </div>
        <Clock />
        <hr className="line" />

        <EndTime />

        <div className="app"></div>
        <hr className="line" />
        <form onSubmit={this.handleSubmit}>
          <label className="newTaskLableName">New Task Name:</label>
          <input
            className="newTaskInput"
            type="text"
            name="taskName"
            onChange={this.changeHandler}
            required
          />

          <AddToCalendarBtn className='addToCal' title={this.state.taskName} />
          <br />


          <label className="newTaskLableName">
            Pick an icon for your task!
          </label>
          <div className="iconDropContainer">
            <div className="displayIcons">
              <div id="iconOne">
                <i
                  id="icon"
                  data-myval="1"
                  className="fas fa-heartbeat iconDropdown"
                ></i>
              </div>
              <div id="iconTwo">
                <i
                  id="icon"
                  data-myval="2"
                  className="fas fa-hospital iconDropdown"
                ></i>
              </div>
              <div id="iconThree">
                <i
                  id="icon"
                  data-myval="3"
                  className="fab fa-accessible-icon iconDropdown"
                ></i>
              </div>
              <div id="iconFour">
                <i
                  id="icon"
                  data-myval="4"
                  className="fas fa-carrot iconDropdown"
                ></i>
              </div>
              <div id="iconFive">
                <i
                  id="icon"
                  data-myval="5"
                  className="fas fa-broom iconDropdown"
                ></i>
              </div>
              <div id="iconSix">
                <i
                  id="icon"
                  data-myval="6"
                  className="fab fa-black-tie iconDropdown"
                ></i>
              </div>
            </div>

            <DropdownButton
              id="dropdown-item-button"
              title=""
              onClick={evt => {
                evt.preventDefault();
              }}
            >
              <Dropdown.Item
                onClick={this.addIcons}
                className="addIcon"
                onClick={() => {
                  this.setState({
                    icon:
                      '<i id="icon" className="fas fa-heartbeat iconDropdown"></i>'
                  })
                  this.addIconOne()
                }}
                as="button"
              >
                <i id="icon" className="fas fa-heartbeat iconDropdown"></i>
              </Dropdown.Item>
              <Dropdown.Item
                className="addIcon"
                onClick={() => {
                  this.setState({
                    icon:
                      '<i id="icon" className="fas fa-hospital iconDropdown"></i>'
                  })
                  this.addIconTwo()
                }}
                as="button"
              >
                <i id="icon" className="fas fa-hospital iconDropdown"></i>
              </Dropdown.Item>
              <Dropdown.Item
                className="addIcon"
                onClick={() => {
                  this.setState({
                    icon:
                      '<i id="icon" className="fab fa-accessible-icon iconDropdown"></i>'
                  })
                  this.addIconThree()
                }}
                as="button"
              >
                <i
                  id="icon"
                  className="fab fa-accessible-icon iconDropdown"
                ></i>
              </Dropdown.Item>
              <Dropdown.Item
                className="addIcon"
                onClick={() => {
                  this.setState({
                    icon:
                      '<i id="icon" className="fas fa-carrot iconDropdown"></i>'
                  })
                  this.addIconFour()
                }}
                as="button"
              >
                <i id="icon" className="fas fa-carrot iconDropdown"></i>
              </Dropdown.Item>
              <Dropdown.Item
                className="addIcon"
                onClick={() => {
                  this.setState({
                    icon:
                      '<i id="icon" className="fas fa-broom iconDropdown"></i>'
                  })
                  this.addIconFive()
                }}
                as="button"
              >
                <i id="icon" className="fas fa-broom iconDropdown"></i>
              </Dropdown.Item>
              <Dropdown.Item
                className="addIcon"
                onClick={() => {
                  this.setState({
                    icon:
                      '<i id="icon" className="fab fa-black-tie iconDropdown"></i>'
                  })
                  this.addIconSix()
                }}
                as="button"
              >
                <i id="icon" className="fab fa-black-tie iconDropdown"></i>
              </Dropdown.Item>
            </DropdownButton>
            {/* <Label /> */}
          </div>
          <hr className="line" />
          <div className="switchContainer">
            <p className="notifySwitchText">
              Turn on in-app notifications for this task?
            </p>
            <Switch
              onClick={this.toggleNotify}
              on={this.state.notifyOn}
              className="notifySwitch"
            />
          </div>
          {/* <div className="switchContainer">
            <p className="notifySwitchText">
              Add this task to your
              <span className="googleContainer">
                <span className="blue"> G</span>
                <span className="red">o</span>
                <span className="yellow">o</span>
                <span className="blue">g</span>
                <span className="green">l</span>
                <span className="red">e </span>
              </span>
              Calendar?
            </p>
            <Switch
              onClick={this.toggleSwitch}
              on={this.state.switched}
              className="notifySwitch"
            />
          </div> */}

          {this.state.newError && (
            <p className="error">{this.state.newError}</p>
          )}
          <div className="completeBtnContainer">
            <Button className="completeBtn-create" type="submit">
              Complete
            </Button>
          </div>
        </form>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  userData: state.userData,
  date: state.date,
  start_time: state.start_time,
  end_time: state.end_time,
  isLoading: state.isLoading,
  error: state.error
})

const mapDispatchToProps = {
  createTask,
  newStartTime
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(NewTask))
