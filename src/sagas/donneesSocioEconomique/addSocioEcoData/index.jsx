/* eslint-disable import/no-named-as-default-member */
/* eslint-disable import/prefer-default-export */
import { takeLatest, put, all } from 'redux-saga/effects' // eslint-disable-line
import { goBack } from 'connected-react-router'
import addSocioEcoDataActions, {
    addSocioEcoDataTypes,
} from '../../../redux/donneesSocioEconomique/addSocioEcoData'
import { Post } from '../../../serveur/axios'
import alertActions from '../../../redux/alert'

function* addSocioEcoDataSagas({ response }) {
    try {
        const res = yield Post(`economic_data`, response)
        if (res.status === 200 || res.status === 201) {
            yield all([
                yield put(
                    addSocioEcoDataActions.addSocioEcoDataSuccess(res.data)
                ),

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
            yield put(addSocioEcoDataActions.addSocioEcoDataFailure(res))
        }
    } catch (error) {
        yield put(addSocioEcoDataActions.addSocioEcoDataFailure(error))
    }
}

export function* addSocioEcoDataSaga() {
    yield takeLatest(
        addSocioEcoDataTypes.ADD_SOCIO_ECO_DATA_REQUEST,
        addSocioEcoDataSagas
    )
}
