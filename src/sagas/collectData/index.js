import { addSaga } from './add'
import { getTraineesBySectorSaga } from './getTraineesBySector'

const CollectDataSagas = [addSaga, getTraineesBySectorSaga]

export default CollectDataSagas
