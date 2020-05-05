/* eslint-disable import/no-named-as-default-member */
/* eslint-disable import/prefer-default-export */
import { takeLatest, put, all } from 'redux-saga/effects' // eslint-disable-line
import addUniteRegionaleActions, {
    addUniteRegionaleTypes,
} from '../../../redux/uniteRegionale/addUniteRegionale'
import getAllUniteRegionalesActions from '../../../redux/uniteRegionale/getAllUniteRegionales'
import { Post } from '../../../serveur/axios'
import alertActions from '../../../redux/alert'

function* addUniteRegionaleSagas({ response }) {
    try {
        const res = yield Post('uniteRegionale/', response)
        if (res.status === 200 || res.status === 201) {
            yield all([
                yield put(
                    addUniteRegionaleActions.addUniteRegionaleSuccess(res.data)
                ),
                yield put(
                    getAllUniteRegionalesActions.getAllUniteRegionalesRequest()
                ),
            ])
            if (res.data.preview === 'true') {
                yield put(
                    alertActions.alertShow(true, {
                        onConfirm: null,
                        warning: false,
                        info: false,
                        error: false,
                        success: true,
                        message: 'Opération efféctuée avec succès',
                        title: 'Succés',
                    })
                )
            }
        } else {
            yield put(addUniteRegionaleActions.addUniteRegionaleFailure(res))
        }
    } catch (error) {
        yield put(addUniteRegionaleActions.addUniteRegionaleFailure(error))
    }
}

export function* addUniteRegionaleSaga() {
    yield takeLatest(
        addUniteRegionaleTypes.ADD_UNITE_REGIONALE_REQUEST,
        addUniteRegionaleSagas
    )
}
