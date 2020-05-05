import { getAllRolesSaga } from './getAllRoles'
import { getRoleSaga } from './getRole'
import { getAllPermissionsSaga } from './getAllPermissions'
import { addRolesSaga } from './addRoles'
import { deleteRolesSaga } from './deleteRoles'
import { editRoleSaga } from './editRole'

const roles = [
    getAllRolesSaga,
    getRoleSaga,
    getAllPermissionsSaga,
    addRolesSaga,
    deleteRolesSaga,
    editRoleSaga,
]
export default roles
