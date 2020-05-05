/* eslint-disable import/no-named-as-default-member */
/* eslint-disable import/prefer-default-export */
import { takeLatest, put, all } from 'redux-saga/effects' // eslint-disable-line
import getAllProjectsActions, {
    getAllProjectsTypes,
} from '../../../redux/projects/getAllProjects'
import { Get } from '../../../serveur/axios'
import alertActions from '../../../redux/alert'

function* getAllProjectsSagas({ response }) {
    try {
        const res = yield Get(`project_data/project?type=${response.type}`)
        if (res.status === 200 || res.status === 201) {
            yield all([
                yield put(
                    getAllProjectsActions.getAllProjectsSuccess(res.data.data)
                ),

                yield put(
                    alertActions.alertShow(true, {
                        onConfirm: false,
                        warning: false,
                        info: false,
                        error: false,
                        success: true,
                        message: response.intl.formatMessage({
                            id: 'successSagaMessage',
                        }),
                        title: response.intl.formatMessage({
                            id: 'successSagaTitle',
                        }),
                    })
                ),
            ])
        } else {
            yield put(getAllProjectsActions.getAllProjectsFailure(res))
        }
    } catch (error) {
        yield put(getAllProjectsActions.getAllProjectsFailure(error))
    }
}

export function* getAllProjectsSaga() {
    yield takeLatest(
        getAllProjectsTypes.GET_ALL_PROJECTS_REQUEST,
        getAllProjectsSagas
    )
}
