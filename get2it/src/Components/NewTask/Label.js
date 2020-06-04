import React from 'react'
import PropTypes from 'prop-types'
import { CirclePicker } from 'react-color'
import { identity } from 'ramda'
import './NewTask.css'
import { Dropdown, DropdownButton } from 'react-bootstrap'

class PalettePopup extends React.Component {
  static propTypes = {
    onChange: PropTypes.func.isRequired,
    onClose: PropTypes.func
  }

  static defaultProps = {
    onClose: identity
  }
  
  style = {
    position: 'absolute',
    top: '-3px',
    right: '-3px',

    boxSizing: 'content-box',
    background: 'white',
    border: '1px solid #ccc',
    borderRadius: '5px',
    padding: '10px'
  }

  invokeOnClose = () =>
    this.props.onClose()

  componentDidMount = () =>
    window.addEventListener('click', this.invokeOnClose)

  componentWillUnmount = () =>
    window.removeEventListener('click', this.invokeOnClose)

  render(){
    return (
      <div style={ this.style }>
        <CirclePicker
          onChange={ this.props.onChange }
        />
      </div>
    )
  }
}

const ColorIndicator = ({ color, onClick, ...props }) => {
  const style = {
    background: color
  }
  return (
    <div
      className="color-indicator"
      style={ style }
      onClick={ onClick }
      { ...props }
    />
  )
}
ColorIndicator.propTypes = {
  color: PropTypes.string.isRequired,
  onClick: PropTypes.func
}
ColorIndicator.defaultProps = {
  onClick: identity
}


class Label extends React.Component {
  state = {
    paletteOpened: false,
    color: 'red'
  }

  handleColorChange = ({ hex }) =>
    this.setState({
      paletteOpened: false,
      color: hex
    })

  handleOpenPalette = e => {
    /* !!! */
    e.stopPropagation()

    this.setState({ 
      paletteOpened: true 
    })
  }

  handlePaletteClose = () =>
    this.setState({
      paletteOpened: false
    })

  style = {
    position: 'relative'
  }

  render(){
    return (
      <div className="lable">
      <div className="lableColor" style={ this.style }>
        <ColorIndicator
          color={ this.state.color }
          onClick={ this.handleOpenPalette }
        />
        { 
          this.state.paletteOpened && 
            <PalettePopup
              onChange={ this.handleColorChange }
              onClose={ this.handlePaletteClose }
            />
        }
      </div>
      <h1 className="NewTask-Tittle2"></h1>
      {/* <i className="lableIcon" class="fas fa-tint fa-3x"></i> */}
        <div>
        {/* <select className="browser-default custom-select">
          <option>Choose your Icon</option>
          <option value="1">&#x2600;</option>
          <option value="2">&#x2606;</option>
          <option value="3">&#x2618;</option>
        </select> */}
        <DropdownButton id="dropdown-item-button" >
          <Dropdown.Item as="button"><i id="icon" className="fas fa-heartbeat icon"></i></Dropdown.Item>
          <Dropdown.Item as="button"><i id="icon" className="fas fa-heartbeat icon"></i></Dropdown.Item>
          <Dropdown.Item as="button"><i id="icon" className="fas fa-heartbeat icon"></i></Dropdown.Item>
        </DropdownButton>
        </div>
       
      </div>
    )
  }
}

export default Label;