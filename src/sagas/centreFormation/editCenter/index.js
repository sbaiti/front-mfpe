/* eslint-disable import/prefer-default-export */
import { takeLatest, put, all } from 'redux-saga/effects' // eslint-disable-line
import { goBack } from 'connected-react-router'
import editCenterActions, {
    editCenterTypes,
} from '../../../redux/centreFormation/editCenter'
import getAllCentersActions from '../../../redux/centreFormation/getAllCenters'
import { Put } from '../../../serveur/axios'
import alertActions from '../../../redux/alert'

function* editCenterSagas({ response }) {
    try {
        const res = yield Put(`centreFormation/${response.id}`, response)

        if (res.status === 200 || res.status === 201) {
            yield all([
                yield put(editCenterActions.editCenterSuccess(res.data)),
                yield put(getAllCentersActions.getAllCentersRequest()),
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
            yield put(editCenterActions.editCenterFailure(res))
        }
    } catch (error) {
        yield put(editCenterActions.editCenterFailure(error))
    }
}

export function* editCenterSaga() {
    yield takeLatest(editCenterTypes.EDIT_CENTER_REQUEST, editCenterSagas)
}
