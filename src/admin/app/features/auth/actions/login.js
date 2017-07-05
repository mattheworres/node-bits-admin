import {post} from 'truefit-react-utils';
import moment from 'moment';
import {writeAuthCookie} from '../services';

export const LOGIN = 'LOGIN';

export const login = (login, loginInfo) =>
({
  type: LOGIN,
  payload: post('authorize', login)
          .then(payload => {
            writeAuthCookie(payload.data, {
              expires: moment().add(loginInfo.expiresIn).toDate(),
            });
            return payload;
          })
          .catch(err => {
            alert('Login Information Incorrect'); // eslint-disable-line
            throw err;
          }),
});
