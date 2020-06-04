import React, { Component } from "react";
import moment from "moment";
import TimePicker from "./TimePicker";
import './EditTask.css'
import { connect } from "react-redux";
import { newEndTime } from '../../actions.js'


class TimeSelectForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      end_time: moment(this.props.end_time, "h:mm a"),
    }
    // console.log(moment())
  }

  

  handleChange = value => {
    this.setState({ end_time: value }, () => {
      this.props.newEndTime(moment(this.state.end_time).format("h:mm a"));
    });
  };
  handleSubmit = e => {
    e.preventDefault();
    alert(moment(this.state.end_time).format("hh:mm a"));
  };

  render = () => {
    // console.log(moment(this.state.end_time).format("h:mm a"));
    return (
      <div className="timeBlock">
        <h1 className="Title2"> END</h1>
        <div className="startTime">
          <div className="timeContainer" onSubmit={this.handleSubmit}>
            <i className="far fa-clock fa-3x"></i>
            <TimePicker
              className="stupid"
              value={this.state.end_time}
              onChange={this.handleChange}
            />
            <br />
          </div>
        </div>
      </div>
    );
  };
}

const mapDispatchToProps = {
  newEndTime,
};

export default connect(null,mapDispatchToProps)(TimeSelectForm);
