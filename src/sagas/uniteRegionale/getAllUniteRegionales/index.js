/* eslint-disable import/prefer-default-export */
import { takeLatest, put, call, all } from 'redux-saga/effects' // eslint-disable-line
import getAllUniteRegionalesActions, {
    getAllUniteRegionalesTypes,
} from '../../../redux/uniteRegionale/getAllUniteRegionales'
import { Get } from '../../../serveur/axios'

function* getAllUniteRegionalesSagas() {
    try {
        const res = yield Get('uniteRegionale/')

        if (res.status === 200) {
            yield all([
                yield put(
                    getAllUniteRegionalesActions.getAllUniteRegionalesSuccess(
                        res.data.data
                    )
                ),
            ])
        } else {
            yield put(
                getAllUniteRegionalesActions.getAllUniteRegionalesFailure(
                    res.data.data
                )
            )
        }
    } catch (error) {
        yield put(
            getAllUniteRegionalesActions.getAllUniteRegionalesFailure(error)
        )
    }
}

export function* getAllUniteRegionalesSaga() {
    yield takeLatest(
        getAllUniteRegionalesTypes.GET_ALL_UNITE_REGIONALES_REQUEST,
        getAllUniteRegionalesSagas
    )
}
