import React from "react"
import "./style.css"
import { connect } from "react-redux"
import { Link, Route } from "react-router-dom"
import { Form, Button } from "react-bootstrap"
import { updateTask } from "../../actions"
import { getTASKS, deleteTask } from "../../actions"
import $ from "jquery"
import EditTaskModal from "../Home/EditTaskModal"
import AddToCalendarBtn from "../AddCalendarBtn/AddCalendarBtn"

// build task component and set up state
class editTaskList extends React.Component {
  constructor(props) {
    super(props)
    // console.log(props);
    // add tasklist to state
    this.state = {
      taskList: [],
      updatedList: [],
      retrievedTasks: [],
      toggleCheck: ""
    }
  }
  event

  // build function to add tasks to state
  createTaskList = event => {
    // event.preventDefault();
    // pull tasks from props
    const arrList = this.props.userTasks.filter(task => task.status === false)
    const list = []
    // loop through each task and post them to state
    for (let i = 0; i < arrList.length; i++) {
      list.push(arrList[i])
    }
    this.setState({
      taskList: list
    })
  }
  itemArr = []
  check = item => {
    var task = item.id
    console.log(task)
    switch (this.itemArr.includes(task)) {
      case false:
        this.itemArr.push(task)
        // console.log(this.itemArr)
        break
      case true:
        var filtered = this.itemArr.filter(function(el) {
          return el != task
        })
        this.itemArr = filtered
        console.log(filtered)
    }
    this.classBTN(item)
    console.log(this.itemArr)
  }
  classBTN = item => {
    console.log("hitting check")
    $("#containter")
      .find(".checkbox")
      .toggleClass("checkBoxChecked")
  }

  arrar = []
  complete = () => {
    for (var i = 0; i < this.itemArr.length; i++) {
      this.arrar.push(this.itemArr[i])
    }
    this.arrar.map(task => {
      const id = task
      this.getTaskById(id)
    })

    setTimeout(() => {
      window.location.reload(true)
    }, 500)
  }

  tasksById = []
  getTaskById = id => {
    this.state.taskList.map(task => {
      if (task.id === id) {
        this.tasksById.push(task)
      }
    })
    // console.log(this.tasksById)
    this.setState(
      {
        retrievedTasks: this.tasksById
      },
      () => {
        // console.log(this.state.retrievedTasks);

        this.state.retrievedTasks.map(task => {
          const id = task.id
          const payload = {
            ...task,
            status: true
          }
          console.log(payload)

          this.props.updateTask(payload, id)
        })
      }
    )
  }

  deleted = id => {
    this.props.deleteTask(id)
    this.setState(
      {
        taskList: this.props.userTasks.filter(task => {
          return task.status === false
        })
      },
      setTimeout(() => {
        window.location.reload(true)
      }, 100)
    )
  }

  componentDidMount() {
    console.log(this.props.userTasks.filter(task => task.status === false))
    this.setState({
      taskList: this.props.userTasks.filter(task => task.status === false)
    })
  }

  completedTasksList = this.props.userTasks.filter(task => {
    return task.status === true
  })

  // render content to page
  render() {
    return (
      <div className="taskCont">
        <Link id="completedLink" to="/CompletedTaskList">
          <p className="completedLinkText">Completed Tasks:</p>
          <p className="completedLinkCount">{this.completedTasksList.length}</p>
        </Link>
        <Form>
          <Form.Text className="taskTitle">TASK LIST</Form.Text>
        </Form>
        <div id="containter" className="taskListContainer">
          {/* for each item on the state tasklist create a task link on the page */}
          <ul>
            {this.state.taskList.map((item, index) => (
              <li key={index}>
                {/* <AddToCalendarBtn title={item.name} /> */}
                <Form>
                  <Form.Group controlId="formBasicCheckbox">
                    <div
                      className="check checkBox"
                      onClick={index => this.check(item)}
                      type="checkbox"
                    >
                      <input
                        className="checkedBox"
                        type="checkbox"
                        name="vehicle1"
                        value="Bike"
                      ></input>
                    </div>
                    <Link
                      id="formText"
                      to={{
                        pathname: `/edittaskModal/${item.id}`,
                        state: { modal: true }
                      }}
                    >
                      <Form.Text>{item.name}</Form.Text>
                    </Link>
                    <Route
                      path="/edittaskModal/:id"
                      render={props => <EditTaskModal {...props} />}
                    />
                    <Button
                      className="reUseBtn deleteBtn"
                      onClick={() => this.deleted(item.id)}
                    >
                      Delete
                    </Button>
                  </Form.Group>
                </Form>
              </li>
            ))}
          </ul>
          <div className="completeCont">
            <div className="completeBtn">
              <Button onClick={() => this.complete()}>Complete</Button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

// map state to props
const mapStateToProps = state => ({
  userData: state.userData,
  userTasks: state.userTasks
})
const mapDispatchToProps = {
  updateTask,
  getTASKS,
  deleteTask
}
// export the Component
export default connect(mapStateToProps, mapDispatchToProps)(editTaskList)
