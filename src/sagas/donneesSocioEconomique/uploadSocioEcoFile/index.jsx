/* eslint-disable import/no-named-as-default-member */
/* eslint-disable import/prefer-default-export */
import { takeLatest, put, all } from 'redux-saga/effects' // eslint-disable-line
import uploadSocioEcoFileActions, {
    uploadSocioEcoFileTypes,
} from '../../../redux/donneesSocioEconomique/uploadSocioEcoFile'
import { Post } from '../../../serveur/axios'

function* uploadSocioEcoFileSagas({ response }) {
    try {
        const res = yield Post(`csv/economic_data`, response)
        if (res.status === 200) {
            yield all([
                yield put(
                    uploadSocioEcoFileActions.uploadSocioEcoFileSuccess(
                        res.data
                    )
                ),
            ])
        } else {
            yield put(uploadSocioEcoFileActions.uploadSocioEcoFileFailure(res))
        }
    } catch (error) {
        yield put(uploadSocioEcoFileActions.uploadSocioEcoFileFailure(error))
    }
}

export function* uploadSocioEcoFileSaga() {
    yield takeLatest(
        uploadSocioEcoFileTypes.UPLOAD_SOCIO_ECO_FILE_REQUEST,
        uploadSocioEcoFileSagas
    )
}
