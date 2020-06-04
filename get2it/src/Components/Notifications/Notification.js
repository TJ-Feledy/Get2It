import React from 'react'
import './notification.css'
import ee from 'event-emitter'


const emitter = new ee()

export const notify = (msg) => {
  emitter.emit('notification', msg)
}

export default class Notification extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      top: -150,
      msg: '',
    }
    this.timeout = null

    
  }

  componentDidMount() {
    this._mounted = true
    emitter.on("notification", msg => {
      this.onShow(msg);
    });
  }

  componentWillUnmount() {
    this._mounted = false;
    clearTimeout(this.timeout)
    this.timeout = null
  }
  
  onShow = (msg) => {
    if(this.timeout){
      clearTimeout(this.timeout)
        
      this.setState({
        top: -150
      }, () => {
        this.timeout = setTimeout(() => {
          this.showNotification(msg)
        }, 500)
      })
    } else {
      this.showNotification(msg)
    }
  }

  showNotification = (msg) => {
    if (this._mounted) {
      
      this.setState({
        top: 18,
        msg: msg,
      }
      , () => {
        this.timeout = setTimeout(() => {
          this.setState({
            top: -150,
          })
        }, 6000);
      }
      )
    }
  }

  render() {
    return (
      <>
        <div className="notificationContainer" style={{ top: this.state.top }}>
          <div className="notificationBody">
            <i className="fas fa-exclamation-circle notificationIcon"></i>
            {this.state.msg}
          </div>
        </div>
      </>
    );
  }

}