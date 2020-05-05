/* eslint-disable import/no-named-as-default-member */
/* eslint-disable import/prefer-default-export */
import { takeLatest, put, all } from 'redux-saga/effects' // eslint-disable-line
import editNotificationsActions, {
    editNotificationsTypes,
} from '../../../redux/notification/editNotifications'
import getAllNotificationsActions from '../../../redux/notification/getAllNotifications'
import { Patch } from '../../../serveur/axios'

function* editNotificationsSagas({ response }) {
    try {
        const res = yield Patch(`notification/${response}`)

        if (res.status === 200 || res.status === 201) {
            yield all([
                yield put(
                    editNotificationsActions.editNotificationsSuccess(res.data)
                ),
                yield put(
                    getAllNotificationsActions.getAllNotificationsRequest()
                ),
            ])
        } else {
            yield put(editNotificationsActions.getAllNotificationsFailure(res))
        }
    } catch (error) {
        yield put(editNotificationsActions.getAllNotificationsFailure(error))
    }
}

export function* editNotificationsSaga() {
    yield takeLatest(
        editNotificationsTypes.EDIT_NOTIFICATIONS_REQUEST,
        editNotificationsSagas
    )
}
