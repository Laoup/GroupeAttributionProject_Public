import React from 'react';

import './index.scss';

import Button from '../../atoms/Button';

function ColumnCustomMenu({title, data, optsMenu, fct}) {
  return (
    <div className="custom-col-menu">
      <h4>{title}</h4>
      <div>
        {
          data.map((elem) => {
            return (
              <div className="line"
                key={elem}
                >
                {
                  optsMenu.map((opt, index) => {
                  return (
                    <Button key={index}
                      id={elem}
                      type="button"
                      clickEvent={fct}
                      text={opt}
                    />
                  );
                })
              }
            </div>
          );
        })
      }
    </div>
  </div>
  );
};

export default ColumnCustomMenu;
