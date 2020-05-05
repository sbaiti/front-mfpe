/* eslint-disable import/no-named-as-default-member */
/* eslint-disable import/prefer-default-export */
import { takeLatest, put, all } from 'redux-saga/effects' // eslint-disable-line
import editSpecialiteActions, {
    editSpecialiteTypes,
} from '../../../redux/specialite/editSpecialite'
import getAllSpecialitesActions from '../../../redux/specialite/getAllSpecialites'
import { Put } from '../../../serveur/axios'
import alertActions from '../../../redux/alert'

function* editSpecialiteSagas({ response }) {
    try {
        const res = yield Put(`specialite/${response.id}`, response)
        if (res.status === 200 || res.status === 201) {
            yield all([
                yield put(getAllSpecialitesActions.getAllSpecialitesRequest()),
                yield put(
                    editSpecialiteActions.editSpecialiteSuccess(res.data)
                ),
                yield put(
                    alertActions.alertShow(true, {
                        onConfirm: false,
                        warning: false,
                        info: false,
                        error: false,
                        success: true,
                        message: response.intl.formatMessage({
                            id: 'successSagaMessage',
                        }),
                        title: response.intl.formatMessage({
                            id: 'successSagaTitle',
                        }),
                    })
                ),
            ])
        } else {
            yield put(editSpecialiteActions.editSpecialiteFailure(res))
        }
    } catch (error) {
        yield put(editSpecialiteActions.editSpecialiteFailure(error))
    }
}

export function* editSpecialiteSaga() {
    yield takeLatest(
        editSpecialiteTypes.EDIT_SPECIALITE_REQUEST,
        editSpecialiteSagas
    )
}
