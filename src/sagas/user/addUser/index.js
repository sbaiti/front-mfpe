/* eslint-disable import/no-named-as-default-member */
/* eslint-disable import/prefer-default-export */
import { takeLatest, put, all } from 'redux-saga/effects' // eslint-disable-line
import addUserActions, { addUserTypes } from '../../../redux/user/addUser'
// import getAllUsersActions from '../../../redux/user/getAllUsers'
import alertActions from '../../../redux/alert'
import { Post } from '../../../serveur/axios'

function* addUserSagas({ response }) {
    try {
        const res = yield Post('users/inscription', response)
        if (res.status === 200 || res.status === 201) {
            yield all([
                yield put(addUserActions.addUserSuccess(res.data)),

                // yield put(getAllUsersActions.getAllUsersRequest()),
            ])
            if (res.data.preview === 'true') {
                yield put(
                    alertActions.alertShow(true, {
                        onConfirm: false,
                        warning: false,
                        info: false,
                        error: false,
                        success: true,
                        message:
                            response.language === 'ar'
                                ? 'تمت عملية التسجيل بنجاح. ستتلقى اٍسم المستخدم و كلمة العبور عن طريق البريد الإلكتروني في غضون 72 ساعة'
                                : 'Votre inscription est en cours de traitement. Vous receverez votre identifiant et mot de passe par mail dans les 72 heures',
                        title: response.language === 'ar' ? 'تم' : 'Succés',
                    })
                )
            }
        } else {
            yield put(addUserActions.addUserFailure(res))
        }
    } catch (error) {
        yield put(addUserActions.addUserFailure(error))
    }
}

export function* addUserSaga() {
    yield takeLatest(addUserTypes.ADD_USER_REQUEST, addUserSagas)
}
