import { combineReducers } from 'redux'
import { reducer as allReferencials } from './getAllReferencial'
import { reducer as addNewReferencial } from './addNewReferencial'
import { reducer as editReferencial } from './editReferencial'
import { reducer as deleteReferencial } from './deleteReferencial'

export default combineReducers({
    allReferencials,
    addNewReferencial,
    editReferencial,
    deleteReferencial,
})
