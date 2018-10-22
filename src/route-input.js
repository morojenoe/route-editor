import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';

class RouteInput extends Component {
  constructor() {
    super();
    this.state = {
      value: ""
    };
  }

  onChange(value) {
    if (value.length <= this.props.maxInputLength) {
      this.setState({value: value});
    }
  }

  validateInput() {
    const newName = this.state.value.trim();
    const { routePoints } = this.props;
    return (
      newName &&
      newName.length <= this.props.maxInputLength &&
      routePoints.findIndex(item => item.name === newName) === -1
    );
  }

  inputEnter(keyCode) {
    const enterKeyCode = 13;
    if (keyCode === enterKeyCode) {
      if (this.validateInput()) {
        this.props.onEnter(this.state.value.trim());
        this.setState({value: ""});
      }
    }
  }

  isErrorState() {
    return !this.validateInput() && this.state.value.trim().length > 0;
  }

  helperText() {
    if (this.isErrorState()) {
      return 'This name already exists';
    }
    return `${this.state.value.length}/${this.props.maxInputLength}`;
  }

  render() {
    return (
      <TextField
        value={this.state.value}
        placeholder="Type point name..."
        onKeyDown={key => this.inputEnter(key.keyCode)}
        onChange={event => this.onChange(event.target.value)}
        helperText={this.helperText()}
        error={this.isErrorState()}
        fullWidth
      />
    );
  }
}

RouteInput.defaultProps = {
  maxInputLength: 16
};

RouteInput.propTypes = {
  maxInputLength: PropTypes.number.isRequired,
  onEnter: PropTypes.func.isRequired,
  routePoints: PropTypes.array.isRequired
};

export default RouteInput;
