/* eslint-disable import/prefer-default-export */
import { takeLatest, put, all } from 'redux-saga/effects'
import deleteAgentActions, {
    deleteAgentTypes,
} from '../../../redux/user/deleteAgent'
import getAllUsersActions from '../../../redux/user/getAllUsers'
import alertActions from '../../../redux/alert'
import { Delete } from '../../../serveur/axios'

function* deleteAgentSagas({ response }) {
    try {
        const res = yield Delete(`users/${response.id}`)
        if (res.status === 200 || res.status === 201) {
            yield all([
                yield put(deleteAgentActions.deleteAgentSuccess(res.data.data)),
                yield put(getAllUsersActions.getAllUsersRequest('all-agents')),
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
            yield put(deleteAgentActions.deleteAgentFailure(res))
        }
    } catch (error) {
        yield put(deleteAgentActions.deleteAgentFailure(error))
    }
}

export function* deleteAgentSaga() {
    yield takeLatest(deleteAgentTypes.DELETE_AGENT_REQUEST, deleteAgentSagas)
}
