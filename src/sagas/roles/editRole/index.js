/* eslint-disable import/no-named-as-default-member */
/* eslint-disable import/prefer-default-export */
import { takeLatest, put, all } from 'redux-saga/effects' // eslint-disable-line
import { goBack } from 'connected-react-router'
import editRoleActions, { editRoleTypes } from '../../../redux/roles/editRole'
import { Put } from '../../../serveur/axios'

function* editRoleSagas({ response }) {
    try {
        const res = yield Put(`user/roles/${response.id}`, response)
        if (res.status === 200 || res.status === 201 || res.status === 202) {
            yield all([
                yield put(editRoleActions.editRoleSuccess(res.data.data)),
                yield put(goBack()),
            ])
        } else {
            yield put(editRoleActions.editRoleFailure(res))
        }
    } catch (error) {
        yield put(editRoleActions.editRoleFailure(error))
    }
}

export function* editRoleSaga() {
    yield takeLatest(editRoleTypes.EDIT_ROLE_REQUEST, editRoleSagas)
}
