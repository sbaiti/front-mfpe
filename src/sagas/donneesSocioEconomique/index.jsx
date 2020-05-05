import { addSocioEcoDataSaga } from './addSocioEcoData'
import { getSocioEcoDataSaga } from './getSocioEcoData'
import { uploadSocioEcoFileSaga } from './uploadSocioEcoFile'

const SocioEcoDataSagas = [
    getSocioEcoDataSaga,
    addSocioEcoDataSaga,
    uploadSocioEcoFileSaga,
]

export default SocioEcoDataSagas
