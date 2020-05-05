import { combineReducers } from 'redux'
import { reducer as allUniteRegionales } from './getAllUniteRegionales'
import { reducer as addUniteRegionale } from './addUniteRegionale'
import { reducer as editUniteRegionale } from './editUniteRegionale'
import { reducer as deleteUniteRegionale } from './deleteUniteRegionale'

export default combineReducers({
    allUniteRegionales,
    addUniteRegionale,
    editUniteRegionale,
    deleteUniteRegionale,
})
