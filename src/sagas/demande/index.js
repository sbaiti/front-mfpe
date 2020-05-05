import { getAllDemandesSaga } from './getAllDemandes'
import { getArchiveSaga } from './getArchive'
import { getDemandeSaga } from './getDemande'
import { addDemandeSaga } from './addDemande'
import { editDemandeSaga } from './editDemande'

const demandeSagas = [
    getDemandeSaga,
    getAllDemandesSaga,
    getArchiveSaga,
    addDemandeSaga,
    editDemandeSaga,
]

export default demandeSagas
