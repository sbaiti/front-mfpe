import { combineReducers } from 'redux'

import { reducer as addInvestmentProject } from './addInvestmentProject'
import { reducer as getAllInvestmentProject } from './getAllInvestmentProject'

export default combineReducers({
    addInvestmentProject,
    getAllInvestmentProject,
})
