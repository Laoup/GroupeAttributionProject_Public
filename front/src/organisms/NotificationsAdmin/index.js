import React from 'react';
import './index.scss';

import http from '../../axiosHttpConfig';

import ChoiceButtons from '../../molecules/ChoiceButtons';

function NotificationsAdmin({xsrfToken, usersWaitingValidation}) {

  const handleClickValidation = async (e) => {
    try {
      console.log(e.target.textContent + "  " + e.target.id + " " + e.target.value );
      const data = {
        email: e.target.value
      };

      if (e.target.id === "Accepter")
      {
        await http.patch("/admin/account", data, {
          withCredentials: true,
          headers: {
            'x-xsrf-token': xsrfToken
          }
        });
      }
      else
      {
        await http.delete("/admin/account", {
          withCredentials: true,
          headers: {
            'x-xsrf-token': xsrfToken
          },
          data
        });
      }
    }
    catch (e) {
      console.log(e);
    }
  }

  const choiceList = ["Accepter", "Refuser"];

  console.log("usersWaitingValidation length =");
  console.log(usersWaitingValidation.length)
  return (
    <article className="notif-admin">
      <h3>Notifications</h3>
      <div>
        {
          (
            usersWaitingValidation.length === 0 &&
              <p>In n'y a pas d'utilisateurs en attente d'inscription pour le moment.</p>
          )
          || usersWaitingValidation.map((elem, index) => {
              return (
                <div key={index}>
                  <p>{elem.first_name} {elem.last_name} souhaite rejoindre la promo: {elem.promo}</p>
                  <div>
                    <ChoiceButtons choiceList={choiceList}
                      clickFct={handleClickValidation} value={elem.email}
                    />
                  </div>
                </div>
              );
            })
          }
      </div>
    </article>
  )
};

export default NotificationsAdmin;

/*
return (
  <article className="notif-admin">
    <h3>Notifications</h3>
    <div>
      {
        (
          usersWaitingValidation.length === 0 &&
            <p>In n'y a pas d'utilisateurs en attente d'inscription pour le moment.</p>
        )
        || usersWaitingValidation.map((elem, index) => {
            return (
              <div key={index}>
                <p>{elem.first_name} {elem.last_name} souhaite rejoindre la promo: {elem.promo}</p>
                <div>
                  <ChoiceButtons choiceList={choiceList}
                    clickFct={handleClickValidation}
                  />
                </div>
              </div>
            );
          })
        }
    </div>
  </article>
)
*/
