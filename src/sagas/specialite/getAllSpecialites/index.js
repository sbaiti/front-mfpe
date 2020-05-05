/* eslint-disable import/prefer-default-export */
import { takeLatest, put, call, all } from 'redux-saga/effects' // eslint-disable-line
import getAllSpecialitesActions, {
    getAllSpecialitesTypes,
} from '../../../redux/specialite/getAllSpecialites'
import { Get } from '../../../serveur/axios'

function* getAllSpecialitesSagas({ response }) {
    try {
        const responseAdd = yield Get('specialite/', response)
        if (responseAdd.status === 200) {
            yield all([
                yield put(
                    getAllSpecialitesActions.getAllSpecialitesSuccess(
                        responseAdd.data.data
                    )
                ),
            ])
        } else {
            yield put(
                getAllSpecialitesActions.getAllSpecialitesFailure(
                    responseAdd.data
                )
            )
        }
    } catch (error) {
        yield put(getAllSpecialitesActions.getAllSpecialitesFailure(error))
    }
}

export function* getAllSpecialitesSaga() {
    yield takeLatest(
        getAllSpecialitesTypes.GET_ALL_SPECIALITES_REQUEST,
        getAllSpecialitesSagas
    )
}
