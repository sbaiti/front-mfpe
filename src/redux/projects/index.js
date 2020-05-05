import { combineReducers } from 'redux'

import { reducer as addProjects } from './addProjects'
import { reducer as getAllProjects } from './getAllProjects'

export default combineReducers({
    addProjects,
    getAllProjects,
})
