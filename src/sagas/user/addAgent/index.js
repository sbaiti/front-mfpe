/* eslint-disable import/no-named-as-default-member */
/* eslint-disable import/prefer-default-export */
import { takeLatest, put, all } from 'redux-saga/effects' // eslint-disable-line
import { goBack } from 'connected-react-router'
import addAgentActions, { addAgentTypes } from '../../../redux/user/addAgent'
import alertActions from '../../../redux/alert'
import { Post } from '../../../serveur/axios'

function* addAgentSagas({ response }) {
    try {
        const res = yield Post('uniteRegionale/personnelDR', response.payload)
        if (res.status === 200 || res.status === 201) {
            yield all([
                yield put(addAgentActions.addAgentSuccess(res.data.data)),
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

                yield put(goBack()),
            ])
        } else {
            yield put(addAgentActions.addAgentFailure(res))
        }
    } catch (error) {
        yield put(addAgentActions.addAgentFailure(error))
    }
}

export function* addAgentSaga() {
    yield takeLatest(addAgentTypes.ADD_AGENT_REQUEST, addAgentSagas)
}
