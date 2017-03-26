/* eslint-disable */
import { createAction, createReducer } from '../../utils';
import { CALL_API } from 'redux-api-middleware';

// -----------------------------------------------------------------------------
// Константы
// -----------------------------------------------------------------------------
const API_URL = 'http://localhost:3000';

export const types = {
  LOGIN: CALL_API,
  LOGIN_REQUEST: '@@LAPPSE/LOGIN_REQUEST',
  LOGIN_FAILURE: '@@LAPPSE/LOGIN_FAILURE',
  LOGIN_SUCCESS: '@@LAPPSE/LOGIN_SUCCESS',
};

// -----------------------------------------------------------------------------
// Экшены
// -----------------------------------------------------------------------------
export function login() {
  return {
    [types.LOGIN]: {
      endpoint: `${API_URL}/api/auth/login`,
      method: 'GET',
      types: [
        types.LOGIN_REQUEST,
        types.LOGIN_SUCCESS,
        types.LOGIN_FAILURE,
      ],
    },
  };
}

// -----------------------------------------------------------------------------
// Редюсер
// -----------------------------------------------------------------------------
const initialState = {};

export default createReducer({
  [types.LOGIN_SUCCESS]: (state, { payload }) => {
    return state.set('user', payload.user);
  },
}, initialState);
