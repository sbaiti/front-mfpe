/* eslint-disable import/prefer-default-export */
import { takeLatest, put, call, all } from 'redux-saga/effects' // eslint-disable-line
import getAllCentersActions, {
    getAllCentersTypes,
} from '../../../redux/centreFormation/getAllCenters'
import { Get } from '../../../serveur/axios'

function* getAllCentersSagas() {
    try {
        const response = yield Get('centreFormation/')
        if (response.status === 200) {
            yield put(
                getAllCentersActions.getAllCentersSuccess(response.data.data)
            )
        } else {
            yield put(
                getAllCentersActions.getAllCentersFailure(response.data.data)
            )
        }
    } catch (error) {
        yield put(getAllCentersActions.getAllCentersFailure(error))
    }
}

export function* getAllCentersSaga() {
    yield takeLatest(
        getAllCentersTypes.GET_ALL_CENTERS_REQUEST,
        getAllCentersSagas
    )
}
