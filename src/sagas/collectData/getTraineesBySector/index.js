/* eslint-disable import/no-named-as-default-member */
/* eslint-disable import/prefer-default-export */
import { takeLatest, put, all } from 'redux-saga/effects' // eslint-disable-line
import getTraineesBySectorActions, {
    getTraineesBySectorTypes,
} from '../../../redux/collectData/getTraineesBySector'
import { Get } from '../../../serveur/axios'

function* getTraineesBySectorSagas({ payload }) {
    try {
        const res = yield Get(
            `collect_data/graduate_training/?level=${payload.level}&sector_type=${payload.sectorType}`
        )
        if (res.status === 200 || res.status === 201) {
            yield all([
                yield put(
                    getTraineesBySectorActions.getTraineesBySectorSuccess(
                        res.data.data
                    )
                ),
            ])
        } else {
            yield put(
                getTraineesBySectorActions.getTraineesBySectorFailure(res)
            )
        }
    } catch (error) {
        yield put(getTraineesBySectorActions.getTraineesBySectorFailure(error))
    }
}

export function* getTraineesBySectorSaga() {
    yield takeLatest(
        getTraineesBySectorTypes.GET_TRAINEES_BY_SECTOR_REQUEST,
        getTraineesBySectorSagas
    )
}
