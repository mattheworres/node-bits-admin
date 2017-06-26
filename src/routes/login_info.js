import {GET} from 'node-bits';

const defaultSecurity = {
  required: true,
  username: 'username',
  password: 'password',
  expiresIn: {days: 1},
};

export default config => {
  const admin = '/admin';
  const security = {...defaultSecurity, ...(config.security || {})};

  return {
    verb: GET,
    route: `${admin}/login_info`,
    implementation: {
      get: (req, res) => {
        res.json(security);
      },
    },
  };
};
