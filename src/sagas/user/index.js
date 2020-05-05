import { getAllUsersSaga } from './getAllUsers'
import { getUserSaga } from './getUser'
import { addUserSaga } from './addUser'
import { deleteAgentSaga } from './deleteAgent'
import { addAgentSaga } from './addAgent'
import { editAgentSaga } from './editAgent'
import { editUserSaga } from './editUser'
import { changePasswordSaga } from './changePassword'
import { resetPasswordSaga } from './resetPassword'

const userSagas = [
    getAllUsersSaga,
    getUserSaga,
    addUserSaga,
    deleteAgentSaga,
    addAgentSaga,
    editAgentSaga,
    editUserSaga,
    changePasswordSaga,
    resetPasswordSaga,
]

export default userSagas
