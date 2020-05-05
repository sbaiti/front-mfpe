import { combineReducers } from 'redux'
import { reducer as allCenters } from './getAllCenters'
import { reducer as addCenter } from './addCenter'
import { reducer as editCenter } from './editCenter'

export default combineReducers({
    allCenters,
    addCenter,
    editCenter,
})
