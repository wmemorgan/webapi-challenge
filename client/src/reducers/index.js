import { combineReducers } from 'redux'

import { projectsReducer as projects } from './projectsReducer'
import { projectActionsReducer as actions } from './projectActionsReducer'

export default combineReducers({ projects, actions })