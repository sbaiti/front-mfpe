/* eslint-disable no-case-declarations */
/* eslint-disable import/no-named-as-default-member */
/* eslint-disable import/prefer-default-export */
import { takeLatest, put, all } from 'redux-saga/effects' // eslint-disable-line
import editUniteRegionaleActions, {
    editUniteRegionaleTypes,
} from '../../../redux/uniteRegionale/editUniteRegionale'
import getAllUniteRegionalesActions from '../../../redux/uniteRegionale/getAllUniteRegionales'
import { Put, Post, Patch } from '../../../serveur/axios'
import alertActions from '../../../redux/alert'

function* editUniteRegionaleSagas({ response }) {
    try {
        const { status } = response
        let res = {}
        let resp = {}
        switch (status) {
            case 'SPECIALITE_CHOISIE':
                resp = {
                    centre_formation: response.centre_formation,
                }
                res = yield Put(
                    `uniteRegionale/designer-centre-formation/${response.id}`,
                    resp
                )
                break
            case 'CENTRE_OK':
                resp = {
                    centre_formation: response.centre_formation,
                }
                res = yield Put(
                    `uniteRegionale/designer-centre-formation/${response.id}`,
                    resp
                )
                break
            case 'SCAN_OK':
                resp = {
                    status:
                        response.accept === '0'
                            ? 'REFUS_CENTRE'
                            : 'ATTENTE_PAIEMENT',
                }

                if (response.accept === '0') resp.motif = response.motif
                res = yield Patch(`uniteRegionale/${response.id}`, resp)
                break

            default:
                res = yield Put(`uniteRegionale/edit/${response.id}`, response)
                break
        }
        if (res.status === 200 || res.status === 201) {
            if (
                response.status === 'SPECIALITE_CHOISIE' ||
                response.status === 'CENTRE_OK'
            ) {
                const r = new FormData()
                r.append('file[]', response['file[]'])

                const res2 = yield Post(`document/upload/${response.id}`, r)
                if (res2.status === 200 || res2.status === 201) {
                    yield all([
                        yield put(
                            editUniteRegionaleActions.editUniteRegionaleSuccess(
                                res.data
                            )
                        ),
                        yield put(
                            getAllUniteRegionalesActions.getAllUniteRegionalesRequest()
                        ),
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
                        ),
                    ])
                } else {
                    yield all([
                        yield put(
                            editUniteRegionaleActions.editUniteRegionaleFailure(
                                res.data
                            )
                        ),
                        yield put(
                            alertActions.alertShow(true, {
                                onConfirm: null,
                                warning: false,
                                info: false,
                                error: false,
                                success: false,
                                message:
                                    'une erreur est survenue lors de chargement du fichier',
                                title: 'Erreur',
                            })
                        ),
                    ])
                }
            } else {
                yield all([
                    yield put(
                        editUniteRegionaleActions.editUniteRegionaleSuccess(
                            res.data
                        )
                    ),
                    yield put(
                        getAllUniteRegionalesActions.getAllUniteRegionalesRequest()
                    ),
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
                    ),
                ])
            }
        } else {
            yield put(
                editUniteRegionaleActions.editUniteRegionaleFailure(res.data)
            )
        }
    } catch (error) {
        yield put(editUniteRegionaleActions.editUniteRegionaleFailure(error))
    }
}

export function* editUniteRegionaleSaga() {
    yield takeLatest(
        editUniteRegionaleTypes.EDIT_UNITE_REGIONALE_REQUEST,
        editUniteRegionaleSagas
    )
}
