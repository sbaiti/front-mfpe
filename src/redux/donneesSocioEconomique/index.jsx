import { combineReducers } from 'redux'

import { reducer as addSocioEcoData } from './addSocioEcoData'
import { reducer as getSocioEcoData } from './getSocioEcoData'
import { reducer as uploadSocioEcoFile } from './uploadSocioEcoFile'

export default combineReducers({
    addSocioEcoData,
    getSocioEcoData,
    uploadSocioEcoFile,
})
