/* eslint-disable import/prefer-default-export */
import { takeLatest, put, all } from 'redux-saga/effects' // eslint-disable-line
import getAllPrivateCentersActions, {
    getAllPrivateCentersTypes,
} from '../../../redux/nombreCentreFormationsPrivees/getAllPrivateCenters'
import { Get } from '../../../serveur/axios'

function* getAllPrivateCentersSagas() {
    try {
        const res = yield Get('collect_data/private_training_center/')

        if (res.status === 200) {
            yield all([
                yield put(
                    getAllPrivateCentersActions.getAllPrivateCentersSuccess(
                        res.data.data
                    )
                ),
            ])
        } else {
            yield put(
                getAllPrivateCentersActions.getAllPrivateCentersFailure(
                    res.data.data
                )
            )
        }
    } catch (error) {
        yield put(
            getAllPrivateCentersActions.getAllPrivateCentersFailure(error)
        )
    }
}

export function* getAllPrivateCentersSaga() {
    yield takeLatest(
        getAllPrivateCentersTypes.GET_ALL_PRIVATE_CENTERS_REQUEST,
        getAllPrivateCentersSagas
    )
}
