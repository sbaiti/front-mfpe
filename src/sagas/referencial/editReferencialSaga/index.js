/* eslint-disable import/prefer-default-export */
import { takeLatest, put } from 'redux-saga/effects' // eslint-disable-line
import editReferencesActions, {
    editReferenceTypes,
} from '../../../redux/referencial/editReferencial'
import getAllReferencesActions from '../../../redux/referencial/getAllReferencial'
import { Put } from '../../../serveur/axios'

function* editReferencialSagas({ response }) {
    try {
        const responseEdit = yield Put(`referenciel/${response.id}`, response)
        if (
            responseEdit.status === 200 ||
            responseEdit.status === 201 ||
            responseEdit.status === 202
        ) {
            yield put(
                editReferencesActions.editReferenceSuccess(responseEdit.data)
            )
            yield put(getAllReferencesActions.getAllReferenceRequest())
        } else {
            yield put(
                editReferencesActions.editReferenceFailure(responseEdit.data)
            )
        }
    } catch (error) {
        yield put(editReferencesActions.editReferenceFailure(error))
    }
}

export function* editReferencialSaga() {
    yield takeLatest(
        editReferenceTypes.EDIT_REFERENCE_REQUEST,
        editReferencialSagas
    )
}
