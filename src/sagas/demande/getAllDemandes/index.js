/* eslint-disable import/prefer-default-export */
import { takeLatest, put, call, all } from 'redux-saga/effects' // eslint-disable-line
import getAllDemandesActions, {
    getAllDemandesTypes,
} from '../../../redux/demande/getAllDemandes'
import { Get } from '../../../serveur/axios'

function* getAllDemandesSagas() {
    try {
        const res = yield Get('demande/')

        if (res.status === 200) {
            yield all([
                yield put(
                    getAllDemandesActions.getAllDemandesSuccess(res.data.data)
                ),
            ])
        } else {
            yield put(
                getAllDemandesActions.getAllDemandesFailure(res.data.data)
            )
        }
    } catch (error) {
        yield put(getAllDemandesActions.getAllDemandesFailure(error))
    }
}

export function* getAllDemandesSaga() {
    yield takeLatest(
        getAllDemandesTypes.GET_ALL_DEMANDES_REQUEST,
        getAllDemandesSagas
    )
}
