import {configureHttp as httpConfigure} from 'truefit-react-utils';
import {API_BASE_URL} from 'configs'; // eslint-disable-line

const DEFAULT_CONFIG = {
  baseURL: API_BASE_URL,
};

// The inner function is where you add the logic to pass up credentials
export const configureHttp = store => httpConfigure(() => DEFAULT_CONFIG); // eslint-disable-line
