import React from 'react';
import './index.scss';

import AddPromoForm from '../../organisms/AddPromoForm';
import NotificationsAdmin from '../../organisms/NotificationsAdmin';
import PromoDashboard from '../../organisms/PromoDashboard';

import { useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import http from '../../axiosHttpConfig';

function AdminTemplate() {

  const xsrfToken = useSelector((state) => state.xsrfToken);
  const [usersWaitingValidation, setUsersWaitingValidation] = useState([]);

  useEffect( () => {
    async function getUsersWaitingValidation() {
      try {
        const answer = await http.get("/admin/get-unvalidated-account", {
          withCredentials: true,
          headers: {
            'x-xsrf-token': xsrfToken
          }
        });
        setUsersWaitingValidation(answer.data);
      }
      catch (e) {
        console.log(e);
      }
    }
    getUsersWaitingValidation();
  }, []);

  return (
    <main className="admin-template-main">
      <section className="first-level">
        <AddPromoForm xsrfToken={xsrfToken} />
        <NotificationsAdmin xsrfToken={xsrfToken}
          usersWaitingValidation={usersWaitingValidation}
          />
      </section>
      <section className="second-level">
        <PromoDashboard xsrfToken={xsrfToken} />
      </section>
    </main>
  );
};

export default AdminTemplate;
