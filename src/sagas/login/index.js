/* eslint-disable import/prefer-default-export */
import { takeLatest, put, call, eventChannel, END } from 'redux-saga/effects' // eslint-disable-line
// import { push } from 'react-router-redux'
import loginActions, { loginTypes } from '../../redux/login/index'
import { Post } from '../../serveur/axios'

function* loginSagas(payload) {
    try {
        const response = yield Post('user/auth/login', payload.response)
        if (response.status === 200) {
            yield localStorage.setItem('mfpeToken', response.data.Token)
            yield put(loginActions.loginSuccess(response.data))
            // yield put(push('/dashboard'))
        } else {
            yield put(loginActions.loginFailure(response))
        }
    } catch (error) {
        yield put(loginActions.loginFailure(error))
    }
}

export function* loginSaga() {
    yield takeLatest(loginTypes.LOGIN_REQUEST, loginSagas)
}
