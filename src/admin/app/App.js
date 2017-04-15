import {PropTypes} from 'react';

export default function App({children}) {
  return children;
}

App.propTypes = {
  children: PropTypes.element,
};
