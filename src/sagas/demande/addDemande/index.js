/* eslint-disable import/no-named-as-default-member */
/* eslint-disable import/prefer-default-export */
import { takeLatest, put, all } from 'redux-saga/effects' // eslint-disable-line
// import { goBack } from 'react-router-redux'
import addDemandeActions, {
    addDemandeTypes,
} from '../../../redux/demande/addDemande'
import getAllDemandesActions from '../../../redux/demande/getAllDemandes'
import { Post } from '../../../serveur/axios'
import alertActions from '../../../redux/alert'

function* addDemandeSagas({ response }) {
    try {
        const res = yield Post('demande/', response)
        if (res.status === 200 || res.status === 201) {
            yield all([
                yield put(addDemandeActions.addDemandeSuccess(res.data)),
                yield put(getAllDemandesActions.getAllDemandesRequest()),
            ])
            if (res.data.preview === 'true') {
                yield put(
                    alertActions.alertShow(true, {
                        onConfirm: null,
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
                )
                // yield put(goBack())
            }
        } else {
            yield put(addDemandeActions.addDemandeFailure(res))
        }
    } catch (error) {
        yield put(addDemandeActions.addDemandeFailure(error))
    }
}

export function* addDemandeSaga() {
    yield takeLatest(addDemandeTypes.ADD_DEMANDE_REQUEST, addDemandeSagas)
}
