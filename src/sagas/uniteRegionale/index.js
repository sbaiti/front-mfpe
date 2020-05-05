import { getAllUniteRegionalesSaga } from './getAllUniteRegionales'
import { addUniteRegionaleSaga } from './addUniteRegionale'
import { editUniteRegionaleSaga } from './editUniteRegionale'

const uniteRegionaleSagas = [
    getAllUniteRegionalesSaga,
    addUniteRegionaleSaga,
    editUniteRegionaleSaga,
]

export default uniteRegionaleSagas
