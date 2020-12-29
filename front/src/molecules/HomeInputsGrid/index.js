import React, { Component } from 'react';
import './index.scss';

import PersonalInput from '../../atoms/PersonalInput';
import PersonalSelect from '../../atoms/PersonalSelect';
import Button from '../../atoms/Button';

import http from '../../axiosHttpConfig';

class HomeInputsGrid extends Component {

  state = {
    promoNames: []
  }

  async componentDidMount() {
    try {
      const answer = await http.get("/get-promos-name");
      this.setState({promoNames: answer.data});
    } catch (e) {
      console.log(e);
    }
  }

  render() {
    const { inscription, register } = this.props;

    if (inscription === true)
      return (
        <section className="inputs-grid">
          <article>
            <PersonalInput labelText="Nom:"
              id="last_name" type="text"
              register={register}
               />
            <PersonalInput labelText="GitHub:"
              id="github" type="url"
              register={register}
              />
            <PersonalInput labelText="Email:"
              id="email" type="email"
              register={register}
              />
            <PersonalSelect
              labelText="Promo:"
              id="promo"
              opts={this.state.promoNames}
              register={register}
              />
          </article>
          <article>
            <PersonalInput labelText="Prénom:"
              id="first_name" type="text"
              register={register}
              />
            <PersonalInput labelText="Mot de Passe:"
              id="password" type="text"
              register={register}
              />
            <div className="left-button register">
              <Button text="Enregistrer"
                type="submit" />
            </div>
          </article>
        </section>
    );
  else
    return (
      <section className="inputs-grid">
        <article>
          <PersonalInput labelText="Email:"
            id="email" type="email" />
          <PersonalInput labelText="Mot de Passe:"
            id="mdp" type="text" />
        </article>
        <article>
          <div className="left-button">
            <Button text="Connexion"
              type="submit" />
          </div>
        </article>
      </section>
    );
  }
}

export default HomeInputsGrid;
