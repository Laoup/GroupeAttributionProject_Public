import React from 'react';
import './index.scss';

import Button from "../../atoms/Button";

function ChoiceButtons({choiceList, clickFct, value}) {

  return (
    <div className="choice-buttons">
      {
        choiceList.map(choice => {
          return (
            <Button key={choice} text={choice}
              type="button" id={choice} clickEvent={clickFct} value={value}
            />
          )
        })
      }
    </div>
  )
}

export default ChoiceButtons;

/*
<Button key={choice} text={choice}
  type="submit" id={choice}
  clickEvent={clickFct}
/>
*/
