import { editSpecialiteSaga } from './editSpecialite'
import { getAllSpecialitesSaga } from './getAllSpecialites'
import { deleteSpecialiteSaga } from './deleteSpecialite'
import { addSpecialiteSaga } from './addSpecialite'

const userSagas = [
    editSpecialiteSaga,
    deleteSpecialiteSaga,
    addSpecialiteSaga,
    getAllSpecialitesSaga,
]

export default userSagas
