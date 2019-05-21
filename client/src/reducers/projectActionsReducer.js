import {
  FETCH_ACTION_START,
  FETCH_ACTION_SUCCESS,
  FETCH_ACTION_FAILURE,
  ADD_ACTION_START,
  ADD_ACTION_SUCCESS,
  ADD_ACTION_FAILURE,
  UPDATE_ACTION_START,
  UPDATE_ACTION_SUCCESS,
  UPDATE_ACTION_FAILURE,
  DELETE_ACTION_START,
  DELETE_ACTION_SUCCESS,
  DELETE_ACTION_FAILURE,
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
    case FETCH_ACTION_START:
      return {
        ...state,
        fetchingActions: true,
        error: null,
        errorStatusCode: null,
      }

    case FETCH_ACTION_SUCCESS:
      return {
        ...state,
        actions: action.payload,
        fetchingActions: false,
        error: null,
        errorStatusCode: null,
      }

    case FETCH_ACTION_FAILURE:
      return {
        ...state,
        actions: [],
        fetchingActions: false,
        error: action.payload.data.error,
        errorStatusCode: action.payload.status,
      }

    case ADD_ACTION_START:
      return {
        ...state,
        addingAction: true,
        error: null,
        errorStatusCode: null,
      }

    case ADD_ACTION_SUCCESS:
      return {
        ...state,
        actions: action.payload,
        addingAction: false,
        error: null,
        errorStatusCode: null,
      }

    case ADD_ACTION_FAILURE:
      return {
        ...state,
        actions: [],
        addingAction: false,
        error: action.payload.data.error,
        errorStatusCode: action.payload.status,
      }

    case UPDATE_ACTION_START:
      return {
        ...state,
        updatingAction: true,
        error: null,
        errorStatusCode: null,
      }

    case UPDATE_ACTION_SUCCESS:
      return {
        ...state,
        actions: action.payload,
        updatingAction: false,
        error: null,
        errorStatusCode: null,
      }

    case UPDATE_ACTION_FAILURE:
      return {
        ...state,
        actions: [],
        updatingAction: false,
        error: action.payload.data.error,
        errorStatusCode: action.payload.status,
      }

    case DELETE_ACTION_START:
      return {
        ...state,
        deletingAction: true,
        error: null,
        errorStatusCode: null,
      }

    case DELETE_ACTION_SUCCESS:
      return {
        ...state,
        actions: action.payload,
        deletingAction: false,
        error: null,
        errorStatusCode: null,
      }

    case DELETE_ACTION_FAILURE:
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
