/* eslint-disable import/no-named-as-default-member */
/* eslint-disable import/prefer-default-export */
import { takeLatest, put, all } from 'redux-saga/effects' // eslint-disable-line
import uploadBtsFileActions, {
    uploadBtsFileTypes,
} from '../../../redux/donneesBts/uploadBtsFile'
import { Post } from '../../../serveur/axios'

function* uploadBtsFileSagas({ response }) {
    try {
        const res = yield Post(`csv/bts_data`, response)
        if (res.status === 200) {
            yield all([
                yield put(uploadBtsFileActions.uploadBtsFileSuccess(res.data)),
            ])
        } else {
            yield put(uploadBtsFileActions.uploadBtsFileFailure(res))
        }
    } catch (error) {
        yield put(uploadBtsFileActions.uploadBtsFileFailure(error))
    }
}

export function* uploadBtsFileSaga() {
    yield takeLatest(
        uploadBtsFileTypes.UPLOAD_BTS_FILE_REQUEST,
        uploadBtsFileSagas
    )
}
