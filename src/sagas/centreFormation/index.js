import { getAllCentersSaga } from './getAllCenters'
import { addCenterSaga } from './addCenter'
import { editCenterSaga } from './editCenter'

const userSagas = [getAllCentersSaga, addCenterSaga, editCenterSaga]

export default userSagas
