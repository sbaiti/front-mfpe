/* eslint-disable import/prefer-default-export */
import { takeLatest, put, call, all } from 'redux-saga/effects' // eslint-disable-line
import getPdfLinkActions, {
    getPdfLinkTypes,
} from '../../../redux/pdf/getPdfLink'
import { Post } from '../../../serveur/axios'

function* getPdfLinkSagas({ response }) {
    try {
        const responsePdf = yield Post(response.url, response.payload)
        if (responsePdf.status === 200 || responsePdf.status === 201) {
            window.open(`http://${responsePdf.data.result}`, '_blank')

            yield all([
                response.url === 'demande/export_pdf'
                    ? yield put(
                          getPdfLinkActions.getPdfLinkFailure(responsePdf.data)
                      )
                    : yield put(
                          getPdfLinkActions.getPdfLinkSuccess(responsePdf.data)
                      ),
            ])
        } else {
            yield put(getPdfLinkActions.getPdfLinkFailure(responsePdf.data))
        }
    } catch (error) {
        yield put(getPdfLinkActions.getPdfLinkFailure(error))
    }
}

export function* getPdfLinkSaga() {
    yield takeLatest(getPdfLinkTypes.GET_PDF_LINK_REQUEST, getPdfLinkSagas)
}
