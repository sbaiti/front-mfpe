/* eslint-disable import/prefer-default-export */
import { takeLatest, put, call, all } from 'redux-saga/effects' // eslint-disable-line
import deleteReferencesActions, {
    deleteReferenceTypes,
} from '../../../redux/referencial/deleteReferencial'
import getAllReferencesActions from '../../../redux/referencial/getAllReferencial'
import { Delete } from '../../../serveur/axios'

function* deleteReferencialSagas(response) {
    try {
        const responseDelete = yield Delete(`referenciel/${response.response}`)
        if (responseDelete.status === 200) {
            yield all([
                yield put(
                    deleteReferencesActions.deleteReferenceSuccess(
                        responseDelete.data
                    )
                ),
                yield put(getAllReferencesActions.getAllReferenceRequest()),
            ])
        } else {
            yield put(
                deleteReferencesActions.deleteReferenceFailure(
                    responseDelete.data
                )
            )
        }
    } catch (error) {
        yield put(deleteReferencesActions.deleteReferenceFailure(error))
    }
}

export function* deleteReferencialSaga() {
    yield takeLatest(
        deleteReferenceTypes.DELETE_REFERENCE_REQUEST,
        deleteReferencialSagas
    )
}
