/* eslint-disable import/no-named-as-default-member */
/* eslint-disable import/prefer-default-export */
import { takeLatest, put, all } from 'redux-saga/effects' // eslint-disable-line
import { goBack } from 'connected-react-router'
import editAgentActions, { editAgentTypes } from '../../../redux/user/editAgent'
import alertActions from '../../../redux/alert'
import { Patch } from '../../../serveur/axios'

function* editAgentSagas({ response }) {
    try {
        const res = yield Patch(
            `uniteRegionale/personnelDR/${response.payload.id}`,
            response.payload
        )
        if (res.status === 200 || res.status === 201) {
            yield all([
                yield put(editAgentActions.editAgentSuccess(res.data.data)),
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
            yield put(editAgentActions.editAgentFailure(res))
        }
    } catch (error) {
        yield put(editAgentActions.editAgentFailure(error))
    }
}

export function* editAgentSaga() {
    yield takeLatest(editAgentTypes.EDIT_AGENT_REQUEST, editAgentSagas)
}
