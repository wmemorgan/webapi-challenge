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
} from '../actions/projects'

const initialState = {
  projects: [],
  fetchingProjects: false,
  addingProject: false,
  updatingProject: false,
  deletingProject: false,
  error: null,
  errorStatusCode: null,
}

export const projectsReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_DATA_START:
      return {
        ...state,
        fetchingProjects: true,
        error: null,
        errorStatusCode: null,
      }

    case FETCH_DATA_SUCCESS:
      return {
        ...state,
        projects: action.payload,
        fetchingProjects: false,
        error: null,
        errorStatusCode: null,
      }

    case FETCH_DATA_FAILURE:
      return {
        ...state,
        projects: [],
        fetchingProjects: false,
        error: action.payload.data.error,
        errorStatusCode: action.payload.status,
      }

    case ADD_DATA_START:
      return {
        ...state,
        addingProject: true,
        error: null,
        errorStatusCode: null,
      }

    case ADD_DATA_SUCCESS:
      return {
        ...state,
        projects: action.payload,
        addingProject: false,
        error: null,
        errorStatusCode: null,
      }

    case ADD_DATA_FAILURE:
      return {
        ...state,
        projects: [],
        addingProject: false,
        error: action.payload.data.error,
        errorStatusCode: action.payload.status,
      }

    case UPDATE_DATA_START:
      return {
        ...state,
        updatingProject: true,
        error: null,
        errorStatusCode: null,
      }

    case UPDATE_DATA_SUCCESS:
      return {
        ...state,
        projects: action.payload,
        updatingProject: false,
        error: null,
        errorStatusCode: null,
      }

    case UPDATE_DATA_FAILURE:
      return {
        ...state,
        projects: [],
        updatingProject: false,
        error: action.payload.data.error,
        errorStatusCode: action.payload.status,
      }

    case DELETE_DATA_START:
      return {
        ...state,
        deletingProject: true,
        error: null,
        errorStatusCode: null,
      }

    case DELETE_DATA_SUCCESS:
      return {
        ...state,
        projects: action.payload,
        deletingProject: false,
        error: null,
        errorStatusCode: null,
      }

    case DELETE_DATA_FAILURE:
      return {
        ...state,
        projects: [],
        deletingProject: false,
        error: action.payload.data.error,
        errorStatusCode: action.payload.status,
      }

    default:
      return state
  }
}
