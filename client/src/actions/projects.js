import axios from 'axios'

const API_ENDPOINT = `http://10.6.5.229:5000/api/projects`

export const FETCH_DATA_START = 'FETCH_DATA_START'
export const FETCH_DATA_SUCCESS = 'FETCH_DATA_SUCCESS'
export const FETCH_DATA_FAILURE = 'FETCH_DATA_FAILURE'

export const getProjects = () => dispatch => {
  console.log(`API_ENDPOINT: `, API_ENDPOINT)
  dispatch({ type: FETCH_DATA_START })
  axios
    .get(API_ENDPOINT)
    .then(res => {
      console.log(`getProjects() res`, res.data)
      dispatch({ type: FETCH_DATA_SUCCESS, payload: res.data })
    })
    .catch(err => {
      console.log(err.response)
      dispatch({ type: FETCH_DATA_FAILURE, payload: err.response})
    })
}

export const ADD_DATA_START = 'ADD_DATA_START'
export const ADD_DATA_SUCCESS = 'ADD_DATA_SUCCESS'
export const ADD_DATA_FAILURE = 'ADD_DATA_FAILURE'

export const addProject = project => dispatch => {
  dispatch({ type: ADD_DATA_START })
  axios
    .post(API_ENDPOINT, project)
    .then(res => {
      console.log(`addProject() res: `, res.data)
      dispatch({ type: ADD_DATA_SUCCESS, payload: res.data })
    })
    .catch(err => {
      console.log(err.response)
      dispatch({ type: ADD_DATA_FAILURE, payload: err.response })
    })
}

export const UPDATE_DATA_START = 'UPDATE_DATA_START'
export const UPDATE_DATA_SUCCESS = 'UPDATE_DATA_SUCCESS'
export const UPDATE_DATA_FAILURE = 'UPDATE_DATA_FAILURE'

export const updateProject = project => dispatch => {
  dispatch({ type: UPDATE_DATA_START })
  axios
    .put(`${API_ENDPOINT}/${project.id}`, project)
    .then(res => {
      console.log(`updateProject() res: `, res.data)
      dispatch({ type: UPDATE_DATA_SUCCESS, payload: res.data })
    })
    .catch(err => {
      console.log(err.response)
      dispatch({ type: UPDATE_DATA_FAILURE, payload: err.response })
    })
}

export const DELETE_DATA_START = 'DELETE_DATA_START'
export const DELETE_DATA_SUCCESS = 'DELETE_DATA_SUCCESS'
export const DELETE_DATA_FAILURE = 'DELETE_DATA_FAILURE'

export const deleteProject = id => dispatch => {
  dispatch({ type: DELETE_DATA_START })
  axios
    .delete(`${API_ENDPOINT}/${id}`)
    .then(res => {
      console.log(`deleteProject res: `, res.data)
      dispatch({ type: DELETE_DATA_SUCCESS, payload: res.data })
    })
    .catch(err => {
      console.log(err.response)
      dispatch({ type: DELETE_DATA_FAILURE, payload: err.response })
    })
}