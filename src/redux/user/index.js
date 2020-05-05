import { combineReducers } from 'redux'
import { reducer as allUsers } from './getAllUsers'
import { reducer as user } from './getUser'
import { reducer as addUser } from './addUser'
import { reducer as addAgent } from './addAgent'
import { reducer as deleteAgent } from './deleteAgent'
import { reducer as editAgent } from './editAgent'
import { reducer as editUser } from './editUser'
import { reducer as deleteUser } from './deleteUser'
import { reducer as changePassword } from './changePassword'
import { reducer as resetPassword } from './resetPassword'

export default combineReducers({
    allUsers,
    user,
    addUser,
    addAgent,
    deleteAgent,
    editAgent,
    editUser,
    deleteUser,
    changePassword,
    resetPassword,
})
