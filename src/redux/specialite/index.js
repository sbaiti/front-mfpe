import { combineReducers } from 'redux'
import { reducer as allSpecialites } from './getAllSpecialites'
import { reducer as addSpecialite } from './addSpecialite'
import { reducer as editSpecialite } from './editSpecialite'
import { reducer as deleteSpecialite } from './deleteSpecialite'

export default combineReducers({
    allSpecialites,
    editSpecialite,
    deleteSpecialite,
    addSpecialite,
})
