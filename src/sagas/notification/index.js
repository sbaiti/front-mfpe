import { getAllNotificationsSaga } from './getAllNotifications'
import { editNotificationsSaga } from './editNotifications'

const notificationsSagas = [getAllNotificationsSaga, editNotificationsSaga]

export default notificationsSagas
