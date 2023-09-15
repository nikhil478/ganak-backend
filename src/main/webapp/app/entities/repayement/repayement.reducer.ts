import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IRepayement, defaultValue } from 'app/shared/model/repayement.model';

export const ACTION_TYPES = {
  FETCH_REPAYEMENT_LIST: 'repayement/FETCH_REPAYEMENT_LIST',
  FETCH_REPAYEMENT: 'repayement/FETCH_REPAYEMENT',
  CREATE_REPAYEMENT: 'repayement/CREATE_REPAYEMENT',
  UPDATE_REPAYEMENT: 'repayement/UPDATE_REPAYEMENT',
  DELETE_REPAYEMENT: 'repayement/DELETE_REPAYEMENT',
  RESET: 'repayement/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IRepayement>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false
};

export type RepayementState = Readonly<typeof initialState>;

// Reducer

export default (state: RepayementState = initialState, action): RepayementState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_REPAYEMENT_LIST):
    case REQUEST(ACTION_TYPES.FETCH_REPAYEMENT):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_REPAYEMENT):
    case REQUEST(ACTION_TYPES.UPDATE_REPAYEMENT):
    case REQUEST(ACTION_TYPES.DELETE_REPAYEMENT):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_REPAYEMENT_LIST):
    case FAILURE(ACTION_TYPES.FETCH_REPAYEMENT):
    case FAILURE(ACTION_TYPES.CREATE_REPAYEMENT):
    case FAILURE(ACTION_TYPES.UPDATE_REPAYEMENT):
    case FAILURE(ACTION_TYPES.DELETE_REPAYEMENT):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_REPAYEMENT_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_REPAYEMENT):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_REPAYEMENT):
    case SUCCESS(ACTION_TYPES.UPDATE_REPAYEMENT):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_REPAYEMENT):
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

const apiUrl = 'api/repayements';

// Actions

export const getEntities: ICrudGetAllAction<IRepayement> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_REPAYEMENT_LIST,
  payload: axios.get<IRepayement>(`${apiUrl}?cacheBuster=${new Date().getTime()}`)
});

export const getEntity: ICrudGetAction<IRepayement> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_REPAYEMENT,
    payload: axios.get<IRepayement>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<IRepayement> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_REPAYEMENT,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IRepayement> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_REPAYEMENT,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<IRepayement> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_REPAYEMENT,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
