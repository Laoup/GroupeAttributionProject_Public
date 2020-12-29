import React from 'react';

import './index.scss';

function ColumnCustomTransform({title, data, transform}) {
  const { transformTrue, transformFalse } = transform
  return (
    <div className="custom-col-transform">
      <h4>{title}</h4>
      <div>
        {
          data.map((elem, index) => {
            if (elem === 1)
              return (<p key={index}>{transformTrue}</p>)
            else
              return (<p key={index}>{transformFalse}</p>)
          })
        }
      </div>
    </div>
  );
};

export default ColumnCustomTransform;
