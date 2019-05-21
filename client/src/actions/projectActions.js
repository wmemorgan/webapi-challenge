import axios from 'axios'

// const API_ENDPOINT = `http://localhost:5000/api/projects`
const API_ENDPOINT = process.env.API_ENDPOINT

export const FETCH_ACTION_START = 'FETCH_ACTION_START'
export const FETCH_ACTION_SUCCESS = 'FETCH_ACTION_SUCCESS'
export const FETCH_ACTION_FAILURE = 'FETCH_ACTION_FAILURE'

export const getActions = id => dispatch => {
  console.log(`API_ENDPOINT: `, API_ENDPOINT)
  dispatch({ type: FETCH_ACTION_START })
  axios
    .get(`${API_ENDPOINT}/${id}/actions`)
    .then(res => {
      console.log(`action creator getActions(): `, res.data)
      dispatch({ type: FETCH_ACTION_SUCCESS, payload: res.data })
    })
    .catch(err => {
      console.log(err.response)
      dispatch({ type: FETCH_ACTION_FAILURE, payload: err.response })
    })
}

export const ADD_ACTION_START = 'ADD_ACTION_START'
export const ADD_ACTION_SUCCESS = 'ADD_ACTION_SUCCESS'
export const ADD_ACTION_FAILURE = 'ADD_ACTION_FAILURE'

export const addAction = action => dispatch => {
  dispatch({ type: ADD_ACTION_START })
  axios
    .post(`${API_ENDPOINT}/${action.project_id}/actions`, action)
    .then(res => {
      console.log(res.data)
      dispatch({ type: ADD_ACTION_SUCCESS, payload: res.data })
    })
    .catch(err => {
      console.log(err.response)
      dispatch({ type: ADD_ACTION_FAILURE, payload: err.response })
    })
}

export const UPDATE_ACTION_START = 'UPDATE_ACTION_START'
export const UPDATE_ACTION_SUCCESS = 'UPDATE_ACTION_SUCCESS'
export const UPDATE_ACTION_FAILURE = 'UPDATE_ACTION_FAILURE'

export const updateAction = action => dispatch => {
  dispatch({ type: UPDATE_ACTION_START })
  axios
    .put(`${API_ENDPOINT}/${action.project_id}/actions/${action.id}`, action)
    .then(res => {
      console.log(res.data)
      dispatch({ type: UPDATE_ACTION_SUCCESS, payload: res.data })
    })
    .catch(err => {
      console.log(err.response)
      dispatch({ type: UPDATE_ACTION_FAILURE, payload: err.response })
    })
}

export const DELETE_ACTION_START = 'DELETE_ACTION_START'
export const DELETE_ACTION_SUCCESS = 'DELETE_ACTION_SUCCESS'
export const DELETE_ACTION_FAILURE = 'DELETE_ACTION_FAILURE'

export const deleteAction = action => dispatch => {
  dispatch({ type: DELETE_ACTION_START })
  axios
    .delete(`${API_ENDPOINT}/${action.project_id}/actions/${action.id}`)
    .then(res => {
      console.log(res.data)
      dispatch({ type: DELETE_ACTION_SUCCESS, payload: res.data })
    })
    .catch(err => {
      console.log(err.response)
      dispatch({ type: DELETE_ACTION_FAILURE, payload: err.response })
    })
}