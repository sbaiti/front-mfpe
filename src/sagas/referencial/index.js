import { getAllReferencialSaga } from './getAllReferencialSaga/index'
import { addNewReferencialSaga } from './addNewReferencialSaga'
import { deleteReferencialSaga } from './deleteReferencialSaga'
import { editReferencialSaga } from './editReferencialSaga'

const referencialSagas = [
    getAllReferencialSaga,
    addNewReferencialSaga,
    deleteReferencialSaga,
    editReferencialSaga,
]

export default referencialSagas
