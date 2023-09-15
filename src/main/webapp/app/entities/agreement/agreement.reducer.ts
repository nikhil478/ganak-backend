import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IAgreement, defaultValue } from 'app/shared/model/agreement.model';

export const ACTION_TYPES = {
  FETCH_AGREEMENT_LIST: 'agreement/FETCH_AGREEMENT_LIST',
  FETCH_AGREEMENT: 'agreement/FETCH_AGREEMENT',
  CREATE_AGREEMENT: 'agreement/CREATE_AGREEMENT',
  UPDATE_AGREEMENT: 'agreement/UPDATE_AGREEMENT',
  DELETE_AGREEMENT: 'agreement/DELETE_AGREEMENT',
  RESET: 'agreement/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IAgreement>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false
};

export type AgreementState = Readonly<typeof initialState>;

// Reducer

export default (state: AgreementState = initialState, action): AgreementState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_AGREEMENT_LIST):
    case REQUEST(ACTION_TYPES.FETCH_AGREEMENT):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_AGREEMENT):
    case REQUEST(ACTION_TYPES.UPDATE_AGREEMENT):
    case REQUEST(ACTION_TYPES.DELETE_AGREEMENT):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_AGREEMENT_LIST):
    case FAILURE(ACTION_TYPES.FETCH_AGREEMENT):
    case FAILURE(ACTION_TYPES.CREATE_AGREEMENT):
    case FAILURE(ACTION_TYPES.UPDATE_AGREEMENT):
    case FAILURE(ACTION_TYPES.DELETE_AGREEMENT):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_AGREEMENT_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_AGREEMENT):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_AGREEMENT):
    case SUCCESS(ACTION_TYPES.UPDATE_AGREEMENT):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_AGREEMENT):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: {}
      };
    case ACTION_TYPES.RESET:
      return {
        ...initialState
      };
    default:
      return state;
  }
};

const apiUrl = 'api/agreements';

// Actions

export const getEntities: ICrudGetAllAction<IAgreement> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_AGREEMENT_LIST,
  payload: axios.get<IAgreement>(`${apiUrl}?cacheBuster=${new Date().getTime()}`)
});

export const getEntity: ICrudGetAction<IAgreement> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_AGREEMENT,
    payload: axios.get<IAgreement>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<IAgreement> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_AGREEMENT,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IAgreement> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_AGREEMENT,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<IAgreement> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_AGREEMENT,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
