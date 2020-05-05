/* eslint-disable import/prefer-default-export */
import { takeLatest, put, call, all } from 'redux-saga/effects' // eslint-disable-line
import getArchiveActions, {
    getArchiveTypes,
} from '../../../redux/demande/getArchive'
import { Get } from '../../../serveur/axios'

function* getArchiveSagas({ response }) {
    const { from, to } = response
    try {
        const res = yield Get(
            `demande/archive/?date_debut=${from}&date_fin=${to}`
        )

        if (res.status === 200) {
            yield all([
                yield put(getArchiveActions.getArchiveSuccess(res.data.data)),
            ])
        } else {
            yield put(getArchiveActions.getArchiveFailure(res.data.data))
        }
    } catch (error) {
        yield put(getArchiveActions.getArchiveFailure(error))
    }
}

export function* getArchiveSaga() {
    yield takeLatest(getArchiveTypes.GET_ARCHIVE_REQUEST, getArchiveSagas)
}
