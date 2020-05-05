/* eslint-disable import/prefer-default-export */
import { takeLatest, put, call, all } from 'redux-saga/effects' // eslint-disable-line
import getDemandeActions, {
    getDemandeTypes,
} from '../../../redux/demande/getDemande'
import { Get } from '../../../serveur/axios'

function* getDemandeSagas({ response }) {
    try {
        const res = yield Get(`demande/${response}`)
        if (res.status === 200) {
            yield all([
                yield put(getDemandeActions.getDemandeSuccess(res.data.data)),
            ])
        } else {
            yield put(getDemandeActions.getDemandeFailure(res.data.data))
        }
    } catch (error) {
        yield put(getDemandeActions.getDemandeFailure(error))
    }
}

export function* getDemandeSaga() {
    yield takeLatest(getDemandeTypes.GET_DEMANDE_REQUEST, getDemandeSagas)
}
