/* eslint-disable import/prefer-default-export */
import { takeLatest, put, all } from 'redux-saga/effects' // eslint-disable-line
import getAllRolesActions, {
    getAllRolesTypes,
} from '../../../redux/roles/getAllRoles'
import { Get } from '../../../serveur/axios'

function* getAllRolesSagas() {
    try {
        const responseAdd = yield Get('user/roles')
        if (responseAdd.status === 200) {
            yield all([
                yield put(
                    getAllRolesActions.getAllRolesSuccess(responseAdd.data.data)
                ),
            ])
        } else {
            yield put(
                getAllRolesActions.getAllRolesFailure(responseAdd.data.data)
            )
        }
    } catch (error) {
        yield put(getAllRolesActions.getAllRolesFailure(error))
    }
}

export function* getAllRolesSaga() {
    yield takeLatest(getAllRolesTypes.GET_ALL_ROLES_REQUEST, getAllRolesSagas)
}
