/* eslint-disable import/no-named-as-default-member */
/* eslint-disable import/prefer-default-export */
import { takeLatest, put, all } from 'redux-saga/effects' // eslint-disable-line
import { goBack } from 'connected-react-router'
import addNombreCentreActions, {
    addNombreCentreTypes,
} from '../../../redux/nombreCentreFormationsPrivees/addNombreCentrePrivee'

import alertActions from '../../../redux/alert'
import { Post } from '../../../serveur/axios'

function* addNombreCentreSagas({ response }) {
    try {
        const res = yield Post('collect_data/private_training_center', response)

        if (res.status === 200 || res.status === 201) {
            yield all([
                yield put(
                    addNombreCentreActions.addNombreCentreSuccess(res.data)
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
            yield put(goBack())
        } else {
            yield put(addNombreCentreActions.addNombreCentreFailure(res))
        }
    } catch (error) {
        yield put(addNombreCentreActions.addNombreCentreFailure(error))
    }
}

export function* addNombreCentreSaga() {
    yield takeLatest(
        addNombreCentreTypes.ADD_NOMBRE_CENTRE_REQUEST,
        addNombreCentreSagas
    )
}
