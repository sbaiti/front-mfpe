/* eslint-disable import/prefer-default-export */
import { takeLatest, put, all } from 'redux-saga/effects' // eslint-disable-line
import { goBack } from 'connected-react-router'
import addNewReferencialActions, {
    addNewReferenceTypes,
} from '../../../redux/referencial/addNewReferencial'
import getAllReferencialActions from '../../../redux/referencial/getAllReferencial/index'
import { Post } from '../../../serveur/axios'
import alertActions from '../../../redux/alert'

function* addNewReferencialSagas({ response }) {
    try {
        const responseAdd = yield Post('referenciel/new', response)
        if (responseAdd.status === 200 || responseAdd.status === 201) {
            yield all([
                yield put(
                    addNewReferencialActions.addNewReferenceSuccess(
                        responseAdd.data
                    )
                ),
                yield put(getAllReferencialActions.getAllReferenceRequest()),
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
            yield put(goBack())
        } else {
            yield put(
                addNewReferencialActions.addNewReferenceFailure(
                    responseAdd.data
                )
            )
        }
    } catch (error) {
        yield put(addNewReferencialActions.addNewReferenceFailure(error))
    }
}

export function* addNewReferencialSaga() {
    yield takeLatest(
        addNewReferenceTypes.ADD_NEW_REFERENCE_REQUEST,
        addNewReferencialSagas
    )
}
