import React from 'react';

import './index.scss';

import PersonalInput from '../../atoms/PersonalInput';
import Button from '../../atoms/Button';

function PromoInputsGrid({register}) {

  return (
    <div className="promo-inputs-grid">
      <div>
        <PersonalInput labelText="Nom:"
          id="nom" type="text" register={register} />
        <PersonalInput labelText="Active ?"
          id="active" type="checkbox" register={register} /*form={props.form}*/ />
      </div>
      <div>
        <Button text="Créer" type="submit" />
      </div>
    </div>
  );
};

export default PromoInputsGrid;
