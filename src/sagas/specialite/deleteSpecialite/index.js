/* eslint-disable import/prefer-default-export */
import { takeLatest, put, all } from 'redux-saga/effects' // eslint-disable-line
import deleteSpecialitesActions, {
    deleteSpecialiteTypes,
} from '../../../redux/specialite/deleteSpecialite'
import getAllSpecialitesActions from '../../../redux/specialite/getAllSpecialites'
import { Delete } from '../../../serveur/axios'
import alertActions from '../../../redux/alert'

function* deleteSpecialiteSagas(response) {
    try {
        const responseDelete = yield Delete(
            `specialite/${response.response.id}`
        )
        if (responseDelete.status === 200 || responseDelete.status === 201) {
            yield all([
                yield put(getAllSpecialitesActions.getAllSpecialitesRequest()),
                yield put(
                    deleteSpecialitesActions.deleteSpecialiteSuccess(
                        responseDelete.data
                    )
                ),
                yield put(
                    alertActions.alertShow(true, {
                        onConfirm: false,
                        warning: false,
                        info: false,
                        error: false,
                        success: true,
                        message: response.response.intl.formatMessage({
                            id: 'successSagaMessage',
                        }),
                        title: response.response.intl.formatMessage({
                            id: 'successSagaTitle',
                        }),
                    })
                ),
            ])
        } else {
            yield put(
                deleteSpecialitesActions.deleteSpecialiteFailure(
                    responseDelete.data
                )
            )
        }
    } catch (error) {
        yield put(deleteSpecialitesActions.deleteSpecialiteFailure(error))
    }
}

export function* deleteSpecialiteSaga() {
    yield takeLatest(
        deleteSpecialiteTypes.DELETE_SPECIALITE_REQUEST,
        deleteSpecialiteSagas
    )
}
