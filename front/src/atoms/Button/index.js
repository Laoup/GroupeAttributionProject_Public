import React, { Component } from 'react';
import './index.scss';

class Button extends Component {
  render() {
    const { text, type, clickEvent, id, value } = this.props;

    //console.log("Button " + text + "have an id = " + id);
    if (id === "undefined")
      return (
        <button
          className="button-class"
          type={type}
          onClick={clickEvent}
          value={value}
          >
          {text}
        </button>
      );
    else
      return (
        <button
          id={id}
          className="button-class"
          type={type}
          onClick={clickEvent}
          value={value}
          >
          {text}
        </button>
      );
    }
}

export default Button;
