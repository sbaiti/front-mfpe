/* eslint-disable import/prefer-default-export */
import { takeLatest, put, all } from 'redux-saga/effects' // eslint-disable-line
import getAllPermissionsActions, {
    getAllPermissionsTypes,
} from '../../../redux/roles/getAllPermissions'
import { Get } from '../../../serveur/axios'

function* getAllPermissionsSagas() {
    try {
        const responseAdd = yield Get('user/roles/front-interface')
        if (responseAdd.status === 200) {
            yield all([
                yield put(
                    getAllPermissionsActions.getAllPermissionsSuccess(
                        responseAdd.data
                    )
                ),
            ])
        } else {
            yield put(
                getAllPermissionsActions.getAllPermissionsFailure(
                    responseAdd.data
                )
            )
        }
    } catch (error) {
        yield put(getAllPermissionsActions.getAllPermissionsFailure(error))
    }
}

export function* getAllPermissionsSaga() {
    yield takeLatest(
        getAllPermissionsTypes.GET_ALL_PERMISSIONS_REQUEST,
        getAllPermissionsSagas
    )
}
