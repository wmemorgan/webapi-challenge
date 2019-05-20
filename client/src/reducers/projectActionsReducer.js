import {
  FETCH_DATA_START,
  FETCH_DATA_SUCCESS,
  FETCH_DATA_FAILURE,
  ADD_DATA_START,
  ADD_DATA_SUCCESS,
  ADD_DATA_FAILURE,
  UPDATE_DATA_START,
  UPDATE_DATA_SUCCESS,
  UPDATE_DATA_FAILURE,
  DELETE_DATA_START,
  DELETE_DATA_SUCCESS,
  DELETE_DATA_FAILURE,
} from '../actions/projectActions'

const initialState = {
  actions: [],
  fetchingActions: false,
  addingAction: false,
  updatingAction: false,
  deletingAction: false,
  error: null,
  errorStatusCode: null,
}

export const projectActionsReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_DATA_START:
      return {
        ...state,
        fetchingActions: true,
        error: null,
        errorStatusCode: null,
      }

    case FETCH_DATA_SUCCESS:
      return {
        ...state,
        actions: action.payload,
        fetchingActions: false,
        error: null,
        errorStatusCode: null,
      }

    case FETCH_DATA_FAILURE:
      return {
        ...state,
        actions: [],
        fetchingActions: false,
        error: action.payload.data.error,
        errorStatusCode: action.payload.status,
      }

    case ADD_DATA_START:
      return {
        ...state,
        addingAction: true,
        error: null,
        errorStatusCode: null,
      }

    case ADD_DATA_SUCCESS:
      return {
        ...state,
        actions: action.payload,
        addingAction: false,
        error: null,
        errorStatusCode: null,
      }

    case ADD_DATA_FAILURE:
      return {
        ...state,
        actions: [],
        addingAction: false,
        error: action.payload.data.error,
        errorStatusCode: action.payload.status,
      }

    case UPDATE_DATA_START:
      return {
        ...state,
        updatingAction: true,
        error: null,
        errorStatusCode: null,
      }

    case UPDATE_DATA_SUCCESS:
      return {
        ...state,
        actions: action.payload,
        updatingAction: false,
        error: null,
        errorStatusCode: null,
      }

    case UPDATE_DATA_FAILURE:
      return {
        ...state,
        actions: [],
        updatingAction: false,
        error: action.payload.data.error,
        errorStatusCode: action.payload.status,
      }

    case DELETE_DATA_START:
      return {
        ...state,
        deletingAction: true,
        error: null,
        errorStatusCode: null,
      }

    case DELETE_DATA_SUCCESS:
      return {
        ...state,
        actions: action.payload,
        deletingAction: false,
        error: null,
        errorStatusCode: null,
      }

    case DELETE_DATA_FAILURE:
      return {
        ...state,
        actions: [],
        deletingAction: false,
        error: action.payload.data.error,
        errorStatusCode: action.payload.status,
      }

    default:
      return state
  }
}
