import { createSlice } from '@reduxjs/toolkit';
//import { createReducer } from '@reduxjs/toolkit';
//import { clickInscription } from '../actions';

/*
const initialState = {
  inscription: true
};

const rootReducer = createReducer(state = initialState, {
  [clickInscription]: state => !state.inscription
});
*/

const rootSlice = createSlice({
  name: 'root',
  initialState: {
    inscription: false,
    connexion: true,
    xsrfToken: null
  },
  reducers: {
    clickInscription: state => {
      if (state.inscription === false)
        {
          state.inscription = true;
          state.connexion = false;
        }
    },
    clickConnexion: state => {
      if (state.connexion === false)
        {
          state.connexion = true;
          state.inscription = false;
        }
    },
    addXsrfToken: (state, payload) => {
      state.xsrfToken = payload.payload;
    }
  }
})

export const {
              clickInscription,
              clickConnexion,
              addXsrfToken
            } = rootSlice.actions

export default rootSlice.reducer;
