export default state => state.features.auth.loginInfo ||
  {
    required: true,
    username: 'username',
    password: 'password',
  };
