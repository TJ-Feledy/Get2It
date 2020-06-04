import React from 'react';
import './style.css';
import { connect } from 'react-redux';
import { Form, Button } from 'react-bootstrap';
import { updateTask, getTASKS } from '../../actions';
import CompletedtaskModal from "../Home/CompletedtaskModal";
import $ from "jquery";
import { Link, Route } from "react-router-dom";
// buld completed task component and set up state
class CompletedTaskList extends React.Component {
  constructor(props) {
    super(props);
    console.log(props)
    // add tasklist to state
    this.state= {
      taskList: []
    }
  }
  event
// build function to add tasks to state
  createTaskList = event => {
    // event.preventDefault();
    // pull tasks from props
    const arrList = this.props.userTasks;
    let list =[]
    // loop through each task and post them to state
    for (let i = 0; i < arrList.length;i++) {
      if(arrList[i].status === true){
        list = [
          ...list,
          {
            id: arrList[i].id,
            name: arrList[i].name,
            date: arrList[i].date
          }
        ]     
      }
    };
    this.setState({
      taskList: list
    })
  };

  toggleComplete = event => {
    
  }
  arrar = [];
  complete = (index) => {

    var tasks = this.props.userTasks
    const id = tasks[index].id;

    const payload = {
      status: false
    };

    this.props.updateTask(payload, id);

    setTimeout(() => {
  
      window.location.reload(true);
    }, 100);
  };

  create = event => {
    event.preventDefault();
    console.log('click');
    this.props.getTASKS()

  };

  componentDidMount(){
    this.createTaskList()
  }

  // render content to page
  render() {
    return (
      <div className='completedTaskList'>
        <Form>
          <Form.Text className="taskTitle">COMPLETED TASKS</Form.Text>
        </Form>
        <div>
          {/* for each item on the state tasklist create a task link on the page */}
        <ul>
          {this.state.taskList.map((item, index) => (
            <li className="formStyle" key={index}>
              <Form >
                <Form.Group className='completedGroup' controlId='formBasicCheckbox'>
                  <Form.Text>
                    <p className='completeDate'>{item.date}</p> 
                    <p className='completeName'>{item.name}</p> 
                  </Form.Text>
                  <Link
                        id="formText"
                        className='reUse'
                        to={{
                          pathname: `/editCompletedtaskModal/${item.id}`,
                          state: { modal: true }
                        }}
                      >
                  <div className="reUseBtn" >Re-Use</div>
                  </Link>
                  <Route
                        path="/editCompletedtaskModal/:id"
                        render={props => <CompletedtaskModal {...props} />}
                      />
                </Form.Group>
              </Form>
            </li>
            
          ))}
        </ul>
        </div>
        
      </div>
    );
  }
}
// map state to props
const mapStateToProps = state => ({
  userData: state.userData,
  userTasks: state.userTasks
})
const mapDispatchToProps = {
  updateTask,
  getTASKS
 }
// export the Component
export default connect(mapStateToProps, mapDispatchToProps)(CompletedTaskList)