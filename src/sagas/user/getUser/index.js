/* eslint-disable import/prefer-default-export */
import { takeLatest, put, call, all } from 'redux-saga/effects' // eslint-disable-line
import getUserActions, { getUserTypes } from '../../../redux/user/getUser'
import { Get } from '../../../serveur/axios'

function* getUserSagas({ response }) {
    try {
        const res = yield Get(`users/${response.id}`)
        if (res.status === 200) {
            yield put(getUserActions.getUserSuccess(res.data))
        } else {
            yield put(getUserActions.getUserFailure(res.data))
        }
    } catch (error) {
        yield put(getUserActions.getUserFailure(error))
    }
}

export function* getUserSaga() {
    yield takeLatest(getUserTypes.GET_USER_REQUEST, getUserSagas)
}
