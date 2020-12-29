import React from 'react';
//import './index.scss';

function PersonalSelect({ labelText, id, register, opts}) {

    return (
      <div className="personal-input">
        <label htmlFor={id}>
          {labelText}
        </label>
        <select id={id} name={id}
          ref={register} >
          {
            opts.map((elem) => {
              return (
                <option key={elem.name} value={elem.name}>
                  {elem.name}
                </option>
              );
            })
          }
        </select>
    </div>
  );
};

export default PersonalSelect;
