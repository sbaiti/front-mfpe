/* eslint-disable no-case-declarations */
/* eslint-disable import/no-named-as-default-member */
/* eslint-disable import/prefer-default-export */
import { takeLatest, put, all } from 'redux-saga/effects' // eslint-disable-line
import editDemandeActions, {
    editDemandeTypes,
} from '../../../redux/demande/editDemande'
import getAllDemandesActions from '../../../redux/demande/getAllDemandes'
import { Put, Post, Patch } from '../../../serveur/axios'
import alertActions from '../../../redux/alert'

function* editDemandeSagas({ response }) {
    try {
        let res = {}
        switch (response.method) {
            case 'PUT':
                res = yield Put(response.url, response.response)
                break
            case 'PATCH':
                res = yield Patch(response.url, response.response)
                break
            case 'POST':
                const r = new FormData()
                if (response.url.indexOf('/upload/') > -1) {
                    r.append('file[]', response.response.file)
                }
                if (response.url.indexOf('/upload-pv/') > -1) {
                    r.append('file', response.response.file)
                }
                res = yield Post(response.url, r)
                break

            default:
                break
        }
        if (res.status === 200 || res.status === 201) {
            if (response.url2) {
                yield put(
                    editDemandeActions.editDemandeRequest({
                        method: 'POST',
                        url: response.url2,
                        response: response.response2,
                    })
                )
            } else
                yield all([
                    yield put(editDemandeActions.editDemandeSuccess(res.data)),
                    yield put(getAllDemandesActions.getAllDemandesRequest()),
                    yield put(
                        alertActions.alertShow(true, {
                            onConfirm: null,
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
            yield put(editDemandeActions.editDemandeFailure(res.data))
        }
    } catch (error) {
        yield put(editDemandeActions.editDemandeFailure(error))
    }
}

export function* editDemandeSaga() {
    yield takeLatest(editDemandeTypes.EDIT_DEMANDE_REQUEST, editDemandeSagas)
}
