import React from 'react';
import './index.scss';

import http from '../../axiosHttpConfig';

import { useForm } from "react-hook-form";

import PromoInputsGrid from '../../molecules/PromoInputsGrid';

function AddPromoForm({xsrfToken}) {

  const { handleSubmit, register } = useForm();

  const handleNewPromo = async (data) => {
    try {
      const post_data = {
        name: data.nom,
        is_active: data.active
      };

      await http.post("/admin/add-promo", post_data, {
        withCredentials: true,
        headers: {
          'x-xsrf-token': xsrfToken
        }
      });
    }
    catch (e) {
      console.log(e);
    }
  }

  return (
    <article className="promo-form">
      <h3>Creer une nouvelle Promotion</h3>
      <form onSubmit={handleSubmit(handleNewPromo)}>
        <PromoInputsGrid register={register} />
      </form>
    </article>
  );
};

export default AddPromoForm;
