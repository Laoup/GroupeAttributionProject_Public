import React, { useState, useEffect } from 'react';
import './index.scss';

import http from '../../axiosHttpConfig';

import ColumnCustom from '../../molecules/ColumnCustom';
import ColumnCustomTransform from '../../molecules/ColumnCustomTransform';
import ColumnCustomMenu from '../../molecules/ColumnCustomMenu';

function PromoDashboard({xsrfToken}) {

  const [promosName, setPromosName] = useState([]);
  const [promosActivity, setPromosActivity] = useState([]);
  const [promosId, setPromosId] = useState([]);

  useEffect( () => {
    async function getPromos() {
      try {
        const answer = await http.get("/admin/get-promos", {
          withCredentials: true,
          headers: {
            'x-xsrf-token': xsrfToken
          }
        });
        let tabName = [], tabActivity = [], tabId = [];
        answer.data.forEach((elem) => {
          tabName.push(elem.name);
          tabActivity.push(elem.is_active);
          tabId.push(elem.id);
        })
        setPromosName(tabName);
        setPromosActivity(tabActivity);
        setPromosId(tabId);
      }
      catch (e) {
        console.log(e);
      }
    }
  getPromos();
  }, [xsrfToken])

  const handleClick = (e) => {
    console.log("click detected");
    console.log(e.target);
    console.log(e.target.textContent + "  " + e.target.id);
  }

  const transform = {
    transformTrue: "Active",
    transformFalse: "Inactive"
  }

  const options_menu = ["Détails", "Désactiver", "Supprimer"];

  return (
    <article className="promo-dash">
      <ColumnCustom title="Nom Promo"
      data={promosName} />
      <ColumnCustomTransform title="Active ?"
      data={promosActivity}
      transform={transform}
       />
       <ColumnCustomMenu title="Options"
       data={promosId}
       optsMenu={options_menu}
       fct={handleClick}
       />
    </article>
  )
};

export default PromoDashboard;
