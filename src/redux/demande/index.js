import { combineReducers } from 'redux'
import { reducer as allDemandes } from './getAllDemandes'
import { reducer as archive } from './getArchive'
import { reducer as demande } from './getDemande'
import { reducer as addDemande } from './addDemande'
import { reducer as editDemande } from './editDemande'
import { reducer as deleteDemande } from './deleteDemande'

export default combineReducers({
    allDemandes,
    archive,
    demande,
    addDemande,
    editDemande,
    deleteDemande,
})
