/* eslint-disable import/prefer-default-export */
import { takeLatest, put, all } from 'redux-saga/effects'
import { goBack } from 'connected-react-router'
import addCenterActions, {
    addCenterTypes,
} from '../../../redux/centreFormation/addCenter'
import { Post } from '../../../serveur/axios'
import getAllCentersActions from '../../../redux/centreFormation/getAllCenters'
import alertActions from '../../../redux/alert'

function* addCenterSagas({ response }) {
    try {
        const res = yield Post('centreFormation/', response)

        if (res.status === 200 || res.status === 201) {
            yield all([
                yield put(getAllCentersActions.getAllCentersRequest()),
                yield put(addCenterActions.addCenterSuccess(res.data)),

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
            yield put(addCenterActions.addCenterFailure(res))
        }
    } catch (error) {
        yield put(addCenterActions.addCenterFailure(error))
    }
}

export function* addCenterSaga() {
    yield takeLatest(addCenterTypes.ADD_CENTER_REQUEST, addCenterSagas)
}
