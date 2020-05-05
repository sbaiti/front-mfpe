/* eslint-disable import/no-named-as-default-member */
/* eslint-disable import/prefer-default-export */
import { takeLatest, put, all } from 'redux-saga/effects' // eslint-disable-line
import deleteRolesActions, {
    deleteRolesTypes,
} from '../../../redux/roles/deleteRoles'
import alertActions from '../../../redux/alert'
import { Delete } from '../../../serveur/axios'
import getAllRolesActions from '../../../redux/roles/getAllRoles'

function* deleteRolesSagas({ response }) {
    try {
        const res = yield Delete(`user/roles/${response.id}`)
        if (res.status === 200 || res.status === 201) {
            yield all([
                yield put(deleteRolesActions.deleteRolesSuccess(res.data.data)),
                yield put(getAllRolesActions.getAllRolesRequest()),
                yield put(
                    alertActions.alertShow(true, {
                        onConfirm: false,
                        warning: false,
                        info: false,
                        error: false,
                        success: true,
                        message: response.intl.formatMessage({
                            id: 'successSagaMessage',
                        }),
                        title: response.intl.formatMessage({
                            id: 'successSagaTitle',
                        }),
                    })
                ),
            ])
        } else {
            yield put(deleteRolesActions.deleteRolesFailure(res))
        }
    } catch (error) {
        yield put(deleteRolesActions.deleteRolesFailure(error))
    }
}

export function* deleteRolesSaga() {
    yield takeLatest(deleteRolesTypes.DELETE_ROLES_REQUEST, deleteRolesSagas)
}
