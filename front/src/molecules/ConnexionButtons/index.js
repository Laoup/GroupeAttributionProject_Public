import React, { Component } from 'react';
import './index.scss';

import Button from '../../atoms/Button';

import { connect } from "react-redux";
import { clickInscription, clickConnexion } from '../../store/reducers';

class ConnexionButtons extends Component {
  render() {
    return (
      <div className="connexion_buttons">
        <Button text="Inscription" type="button" clickEvent={() => this.props.clickInscription()} />
        <Button text="Connexion" type="button" clickEvent={() => this.props.clickConnexion()} />
      </div>
    )
  }
}

const mapDispatchToProps = {
  clickInscription,
  clickConnexion
};

export default connect(null, mapDispatchToProps)(ConnexionButtons);
