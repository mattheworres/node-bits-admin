import {removeAuthCookie} from '../services';

export const LOGOUT = 'LOGOUT';
export const logout = () => {
  removeAuthCookie();

  return {
    type: LOGOUT,
  };
};
