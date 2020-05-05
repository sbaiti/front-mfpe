import { combineReducers } from 'redux'
import { reducer as allNotifications } from './getAllNotifications'
import { reducer as editNotifications } from './editNotifications'

export default combineReducers({
    allNotifications,
    editNotifications,
})
