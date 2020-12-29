import React, { Component } from 'react';
import './index.scss';

import Stamp from '../../atoms/Stamp';
import ConnexionButtons from '../../molecules/ConnexionButtons';

class NavigationBar extends Component {
  render() {
    return (
      <nav className="navigation-bar">
        <Stamp />
        <ConnexionButtons />
      </nav>
    )
  }
}

export default NavigationBar;
