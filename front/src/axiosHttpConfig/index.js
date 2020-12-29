import axios from 'axios';
import store from '../store';
import { addXsrfToken } from '../store/reducers';

let http = axios.create({
  baseURL: "http://localhost:8000",
});

http.interceptors.response.use((response) => {
  return response
}, async (error) => { //Si on catch un code de reponse = erreur (!= 200)
  if (error.response.status !== 401 )
    {
      //Si l'erreur n'est pas une erreur 401
      return new Promise((resolve, reject) => {
        reject(error);
      });
    }
  //On stocke la requete originale
  const originalRequest = error.config;
  if (error.config.url === '/token-refresh' || originalRequest._retry)
    {
      //Si on a déja essayer de refresh le token || déja retenté la requête originale.
      //ajout -> Eliminer tout les cookies & infos liés a l'authentification.
      //ajout -> Redirection vers page login
      return new Promise((resolve, reject) => {
          reject(error);
        });
    }
  //On essaye de refresh le token
  const newAccessToken = await axios.get("http://localhost:8000/token-refresh", {
    withCredentials: true,
  })

  if (newAccessToken.status !== 200)
    {
      //Si on a pas réussi a refresh le token
      return new Promise((resolve, reject) => {
        reject(error);
      });
    }
  originalRequest._retry = true;
  //Si on a réussi a refresh alors on met a jour xsrfToken ds le store
  store.dispatch(addXsrfToken(newAccessToken.data.xsrfToken));
  //On corrige le header de la requete originale avec le nouveau xsrfToken
  originalRequest.headers['x-xsrf-token'] = store.getState().xsrfToken;
  return http(originalRequest);
})

export default http;
