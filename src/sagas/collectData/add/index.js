/* eslint-disable import/no-named-as-default-member */
/* eslint-disable import/prefer-default-export */
import { takeLatest, put, all } from 'redux-saga/effects' // eslint-disable-line
import { goBack } from 'connected-react-router'
import addActions, { addTypes } from '../../../redux/collectData/add'
import { Post } from '../../../serveur/axios'
import alertActions from '../../../redux/alert'

function* addSagas({ response }) {
    try {
        const res = yield Post(`collect_data/graduate_training`, response)
        if (res.status === 200 || res.status === 201) {
            yield all([
                yield put(addActions.addSuccess(res.data)),
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
            yield put(addActions.addFailure(res))
        }
    } catch (error) {
        yield put(addActions.addFailure(error))
    }
}

export function* addSaga() {
    yield takeLatest(addTypes.ADD_REQUEST, addSagas)
}
