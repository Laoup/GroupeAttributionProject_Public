import React from 'react';

import './index.scss';

function ColumnCustom({title, data}) {
  return (
    <div className="custom-col">
      <h4>{title}</h4>
      <div>
        {
          data.map((elem, index) => (
            <p key={index}>{elem}</p>
          ))
        }
      </div>
    </div>
  );
};

export default ColumnCustom;
