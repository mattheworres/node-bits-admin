import {get} from 'truefit-react-utils';

export const LOAD_DATA = 'LOAD_DATA';

export const loadData = model =>
({
  type: LOAD_DATA,
  payload: get(model)
          .then(payload => ({
            model,
            data: payload.data,
          })),
});
