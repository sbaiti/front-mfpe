/* eslint-disable import/prefer-default-export */
import { takeLatest, put, call, all } from 'redux-saga/effects' // eslint-disable-line
import getAllNotificationsActions, {
    getAllNotificationsTypes,
} from '../../../redux/notification/getAllNotifications'
import { Get } from '../../../serveur/axios'

function* getAllNotificationsSagas({ response }) {
    try {
        const responseAdd = yield Get('notification/', response)
        if (responseAdd.status === 200) {
            yield all([
                yield put(
                    getAllNotificationsActions.getAllNotificationsSuccess(
                        responseAdd.data.data
                    )
                ),
            ])
        } else {
            yield put(
                getAllNotificationsActions.getAllNotificationsFailure(
                    responseAdd.data
                )
            )
        }
    } catch (error) {
        yield put(getAllNotificationsActions.getAllNotificationsFailure(error))
    }
}

export function* getAllNotificationsSaga() {
    yield takeLatest(
        getAllNotificationsTypes.GET_ALL_NOTIFICATIONS_REQUEST,
        getAllNotificationsSagas
    )
}
