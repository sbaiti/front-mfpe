import { combineReducers } from 'redux'

import { reducer as add } from './add'
import { reducer as getTraineesBySector } from './getTraineesBySector'

export default combineReducers({
    add,
    getTraineesBySector,
})
