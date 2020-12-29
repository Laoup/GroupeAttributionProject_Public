import React from 'react';
import './index.scss';

import { addXsrfToken } from '../../store/reducers';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';

//import axios from 'axios';
import http from '../../axiosHttpConfig';

/*
Useful for check if i received cookies from server
import Cookies from 'js-cookie';
*/

import HomeInputsGrid from '../../molecules/HomeInputsGrid';

function InscriptionForm() {
  const dispatch = useDispatch();
  const history = useHistory();
  const { handleSubmit, register } = useForm();

  const handleConnexion = async (e) => {
    e.preventDefault();

    try {
        const data = {
          email: "USER EMAIL",
          password: "USER PASSWORD"
        };
        const answer = await http.post("/sign-in",
          data,
          {
            withCredentials: true
          });
        if (answer.status === 200)
          {
            dispatch(addXsrfToken(answer.data.xsrfToken));
            history.push("/dashboard");
          }
      }
    catch (e) {
      console.log("Error: Inscription Form");
      console.log(e);
    }
  }

  const handleInscription = async (data) => {
    console.log("We are in handleInscription");
    console.log("data = ");
    console.log(data);
    try {
      const answer = await http.post("/sign-up", data)
      if (answer.status === 200)
        console.log("success");
    }
    catch (e) {
      console.log(e);
    }
  }

  const inscription = useSelector((state) => state.inscription)

  if (inscription === true)
    return (
      <form className="my_form"
        onSubmit={handleSubmit(handleInscription)}>
          <h3>Inscription</h3>
          <HomeInputsGrid
            inscription={true}
            register={register}
            />
      </form>
    );
  else
    return (
      <form className="my_form"
        onSubmit={handleConnexion}
        >
        <h3>Connexion</h3>
        <HomeInputsGrid inscription={false} />
      </form>
    );
}

export default InscriptionForm;
