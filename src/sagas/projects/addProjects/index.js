/* eslint-disable import/no-named-as-default-member */
/* eslint-disable import/prefer-default-export */
import { takeLatest, put, all } from 'redux-saga/effects' // eslint-disable-line
import { goBack } from 'connected-react-router'
import addProjectsActions, {
    addProjectsTypes,
} from '../../../redux/projects/addProjects'
import { Post } from '../../../serveur/axios'

import alertActions from '../../../redux/alert'

function* addProjectsSagas({ response }) {
    try {
        const res = yield Post(`project_data/project`, response)
        if (res.status === 200 || res.status === 201) {
            yield all([
                yield put(addProjectsActions.addProjectsSuccess(res.data)),

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
            yield put(goBack())
        } else {
            yield put(addProjectsActions.addProjectsFailure(res))
        }
    } catch (error) {
        yield put(addProjectsActions.addProjectsFailure(error))
    }
}

export function* addProjectsSaga() {
    yield takeLatest(addProjectsTypes.ADD_PROJECTS_REQUEST, addProjectsSagas)
}
