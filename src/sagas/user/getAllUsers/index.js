/* eslint-disable import/prefer-default-export */
import { takeLatest, put, call, all } from 'redux-saga/effects' // eslint-disable-line
import getAllUsersActions, {
    getAllUsersTypes,
} from '../../../redux/user/getAllUsers'
import { Get } from '../../../serveur/axios'

function* getAllUsersSagas({ response }) {
    try {
        const res = yield Get(`users/${response || 'all'}`)
        if (res.status === 200) {
            yield put(getAllUsersActions.getAllUsersSuccess(res.data))
        } else {
            yield put(getAllUsersActions.getAllUsersFailure(res.data))
        }
    } catch (error) {
        yield put(getAllUsersActions.getAllUsersFailure(error))
    }
}

export function* getAllUsersSaga() {
    yield takeLatest(getAllUsersTypes.GET_ALL_USERS_REQUEST, getAllUsersSagas)
}
