/* eslint-disable import/prefer-default-export */
import { takeLatest, put, call, all } from 'redux-saga/effects' // eslint-disable-line
import getRoleActions, { getRoleTypes } from '../../../redux/roles/getRole'
import { Get } from '../../../serveur/axios'

function* getRoleSagas({ response }) {
    try {
        const res = yield Get(`user/roles/${response}`)
        if (res.status === 200) {
            yield put(getRoleActions.getRoleSuccess(res.data))
        } else {
            yield put(getRoleActions.getRoleFailure(res.data))
        }
    } catch (error) {
        yield put(getRoleActions.getRoleFailure(error))
    }
}

export function* getRoleSaga() {
    yield takeLatest(getRoleTypes.GET_ROLE_REQUEST, getRoleSagas)
}
