import React from 'react';
import './index.scss';

function PersonalInput({ labelText, id, type, register}) {

    return (
      <div className="personal-input">
        <label htmlFor={id}>{labelText}</label>
        <input type={type} id={id} name={id}
          ref={register} />
      </div>
    );
};

export default PersonalInput;
