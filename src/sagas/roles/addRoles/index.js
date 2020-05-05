/* eslint-disable import/no-named-as-default-member */
/* eslint-disable import/prefer-default-export */
import { takeLatest, put, all } from 'redux-saga/effects' // eslint-disable-line
import { goBack } from 'connected-react-router'
import addRolesActions, { addRolesTypes } from '../../../redux/roles/addRoles'
import { Post } from '../../../serveur/axios'

function* addRolesSagas({ response }) {
    try {
        const res = yield Post('user/roles/new', response)
        if (res.status === 200 || res.status === 201) {
            yield all([
                yield put(addRolesActions.addRolesSuccess(res.data.data)),
                yield put(goBack()),
            ])
        } else {
            yield put(addRolesActions.addRolesFailure(res))
        }
    } catch (error) {
        yield put(addRolesActions.addRolesFailure(error))
    }
}

export function* addRolesSaga() {
    yield takeLatest(addRolesTypes.ADD_ROLES_REQUEST, addRolesSagas)
}
