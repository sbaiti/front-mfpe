/* eslint-disable import/no-named-as-default-member */
/* eslint-disable import/prefer-default-export */
import { takeLatest, put, all } from 'redux-saga/effects' // eslint-disable-line
import { goBack } from 'connected-react-router'
import addSpecialiteActions, {
    addSpecialiteTypes,
} from '../../../redux/specialite/addSpecialite'
import getAllSpecialitesActions from '../../../redux/specialite/getAllSpecialites'
import alertActions from '../../../redux/alert'
import { Post } from '../../../serveur/axios'

function* addSpecialiteSagas({ response }) {
    try {
        const res = yield Post('specialite/', response)
        if (res.status === 200 || res.status === 201) {
            yield all([
                yield put(getAllSpecialitesActions.getAllSpecialitesRequest()),
                yield put(addSpecialiteActions.addSpecialiteSuccess(res.data)),
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
            yield put(addSpecialiteActions.addSpecialiteFailure(res))
        }
    } catch (error) {
        yield put(addSpecialiteActions.addSpecialiteFailure(error))
    }
}

export function* addSpecialiteSaga() {
    yield takeLatest(
        addSpecialiteTypes.ADD_SPECIALITE_REQUEST,
        addSpecialiteSagas
    )
}
