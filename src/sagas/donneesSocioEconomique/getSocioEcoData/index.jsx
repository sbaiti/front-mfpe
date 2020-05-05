/* eslint-disable import/prefer-default-export */
import { takeLatest, put, all } from 'redux-saga/effects'
import getSocioEcoDataActions, {
    getSocioEcoDataTypes,
} from '../../../redux/donneesSocioEconomique/getSocioEcoData'
import { Get } from '../../../serveur/axios'

function* getSocioEcoDataSagas() {
    try {
        const res = yield Get(`economic_data`)
        if (res.status === 200 || res.status === 201) {
            yield all([
                yield put(getSocioEcoDataActions.getSocioEcoDataSuccess(res)),
            ])
        } else {
            yield put(getSocioEcoDataActions.getSocioEcoDataFailure(res))
        }
    } catch (error) {
        yield put(getSocioEcoDataActions.getSocioEcoDataFailure(error))
    }
}

export function* getSocioEcoDataSaga() {
    yield takeLatest(
        getSocioEcoDataTypes.GET_SOCIO_ECO_DATA_REQUEST,
        getSocioEcoDataSagas
    )
}
