/* eslint-disable import/no-named-as-default-member */
/* eslint-disable import/prefer-default-export */
import { takeLatest, put, all } from 'redux-saga/effects' // eslint-disable-line
import changePasswordActions, {
    changePasswordTypes,
} from '../../../redux/user/changePassword'
import loginActions from '../../../redux/login'

import { Put } from '../../../serveur/axios'
import alertActions from '../../../redux/alert'

function* changePasswordSagas({ response }) {
    try {
        const res = yield Put(`users/change_password`, response)

        if (res.status === 200 || res.status === 201 || res.status === 202) {
            yield all([
                yield put(
                    changePasswordActions.changePasswordSuccess(res.data)
                ),
                // yield put(push('/demande/liste/en-cours')),
                yield put(
                    loginActions.loginSuccess({
                        User: res.data.data,
                        Token: localStorage.getItem('mfpeToken'),
                    })
                ),
                yield put(
                    alertActions.alertShow(true, {
                        onConfirm: false,
                        warning: false,
                        info: false,
                        error: false,
                        success: true,
                        message:
                            response.language === 'ar'
                                ? 'تم تغيير كلمة المرور'
                                : 'Votre mot de passe a est changée',
                        title: response.language === 'ar' ? 'تم' : 'Succés',
                    })
                ),
            ])
        } else {
            yield put(changePasswordActions.changePasswordFailure(res))
        }
    } catch (error) {
        yield put(changePasswordActions.changePasswordFailure(error))
    }
}

export function* changePasswordSaga() {
    yield takeLatest(
        changePasswordTypes.CHANGE_PASSWORD_REQUEST,
        changePasswordSagas
    )
}
