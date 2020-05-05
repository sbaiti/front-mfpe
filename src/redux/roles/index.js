import { combineReducers } from 'redux'
import { reducer as getAllRoles } from './getAllRoles'
import { reducer as getAllUsers } from './getAllUsers'
import { reducer as getRole } from './getRole'
import { reducer as getAllPermissions } from './getAllPermissions'
import { reducer as addRoles } from './addRoles'
import { reducer as deleteRoles } from './deleteRoles'
import { reducer as editRole } from './editRole'

export default combineReducers({
    getAllRoles,
    getRole,
    getAllUsers,
    getAllPermissions,
    addRoles,
    deleteRoles,
    editRole,
})
