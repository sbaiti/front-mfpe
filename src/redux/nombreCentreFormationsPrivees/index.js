import { combineReducers } from 'redux'
import { reducer as addNombreCentre } from './addNombreCentrePrivee'
import { reducer as getAllPrivateCenters } from './getAllPrivateCenters'

export default combineReducers({
    addNombreCentre,
    getAllPrivateCenters,
})
