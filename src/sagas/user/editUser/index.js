/* eslint-disable import/no-named-as-default-member */
/* eslint-disable import/prefer-default-export */
import { takeLatest, put, all } from 'redux-saga/effects' // eslint-disable-line
import editUserActions, { editUserTypes } from '../../../redux/user/editUser'
import getAllUsersActions from '../../../redux/user/getAllUsers'
import loginActions from '../../../redux/login'
import { Put } from '../../../serveur/axios'

function* editUserSagas({ response }) {
    try {
        const res = yield Put(`users/`, response)

        if (res.status === 200 || res.status === 201) {
            yield all([
                yield put(editUserActions.editUserSuccess(res.data)),
                yield put(
                    loginActions.loginSuccess({
                        User: res.data.data,
                        Token: localStorage.getItem('mfpeToken'),
                    })
                ),
                yield put(getAllUsersActions.getAllUsersRequest()),
            ])
        } else {
            yield put(editUserActions.editUserFailure(res))
        }
    } catch (error) {
        yield put(editUserActions.editUserFailure(error))
    }
}

export function* editUserSaga() {
    yield takeLatest(editUserTypes.EDIT_USER_REQUEST, editUserSagas)
}
