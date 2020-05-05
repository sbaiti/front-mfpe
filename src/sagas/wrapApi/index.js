/* eslint-disable import/prefer-default-export */
import { takeLatest, put, select } from 'redux-saga/effects'
// eslint-disable-line
import wrapApiActions, { wrapApiTypes } from '../../redux/wrapApi/index'
import instance from '../../serveur/axios'
// import alertActions from '../../redux/alert'

const jwtDecode = require('jwt-decode')

function* wrapApiPut(payload) {
    try {
        if (payload.response.status >= 201 && payload.response.status < 226) {
            // yield put(
            //     alertActions.alertShow(
            //         false,
            //         true,
            //         false,
            //         false,
            //         'Success',
            //         payload.response.data.message.message
            //     )
            // )
        }
    } catch (error) {
        yield put(wrapApiActions.wrapApiPutFailure(error))
    }
}

function* wrapApiCall() {
    try {
        const { login } = yield select()
        const { mfpeToken } = window.localStorage
        if (login.response) {
            if (login.response.Token) {
                if (
                    jwtDecode(login.response.Token).exp < Date.now() / 1000 ||
                    !mfpeToken
                ) {
                    yield put({ type: 'SIGNOUT_REQUEST' })
                } else {
                    instance.defaults.headers.Authorization = `Bearer ${login.response.Token}`
                }
            } else {
                yield put({ type: 'SIGNOUT_REQUEST' })
            }
        }
    } catch (error) {
        yield put(wrapApiActions.wrapApiCallFailure(error))
    }
}
export function* wrapApi() {
    yield takeLatest(wrapApiTypes.WRAP_API_PUT, wrapApiPut)
    yield takeLatest(wrapApiTypes.WRAP_API_CALL, wrapApiCall)
    yield takeLatest(wrapApiTypes.WRAP_API_PUT_FAILURE, wrapApiPut)
}
