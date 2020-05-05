/* eslint-disable import/no-named-as-default-member */
/* eslint-disable import/prefer-default-export */
import { takeLatest, put, all } from 'redux-saga/effects' // eslint-disable-line
import resetPasswordActions, {
    resetPasswordTypes,
} from '../../../redux/user/resetPassword'
import { Put } from '../../../serveur/axios'

function* resetPasswordSagas({ response }) {
    try {
        const res = yield Put(`users/reset_password`, response)
        if (res.status === 202) {
            yield put(resetPasswordActions.resetPasswordSuccess(res.data))
        } else {
            yield put(resetPasswordActions.resetPasswordFailure(res))
        }
    } catch (error) {
        yield put(resetPasswordActions.resetPasswordFailure(error))
    }
}

export function* resetPasswordSaga() {
    yield takeLatest(
        resetPasswordTypes.RESET_PASSWORD_REQUEST,
        resetPasswordSagas
    )
}
