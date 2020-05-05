import { takeLatest, put } from 'redux-saga/effects'
import axios from 'axios'
import getAllReferencesActions, {
    getAllReferenceTypes,
} from '../../../redux/referencial/getAllReferencial'
import getLoaderActions from '../../../redux/wrapApi/index'
import instance from '../../../serveur/axios'

export function renameKeys(obj) {
    const keyValues = Object.keys(obj).map(key => {
        const newKey = obj[key].id || key.substring(30, key.length)
        return { [newKey]: obj[key] }
    })
    return Object.assign({}, ...keyValues)
}
function* getByPaginationReferencialSagas(payload) {
    let result = '?'
    Object.keys(payload).map((key, index) => {
        if (key !== 'type' && payload[key] != null) {
            if (index !== 1) {
                result += '&'
            }
            result += key
            result += '='
            result += payload[key]
        }
        return result
    })
    const response = yield instance.get(`referenciel/${result}`)
    if (response.status === 200) {
        yield put(
            getAllReferencesActions.getReferenceByPaginationSuccess(
                response.data.data
            )
        )
    } else {
        yield put(
            getAllReferencesActions.getReferenceByPaginationFailure(response)
        )
    }
}
function* getAllReferencialSagas() {
    try {
        yield put(getLoaderActions.activeGeneraleLoader())
        const response = yield axios({
            method: 'get',
            url: `${process.env.REACT_APP_BASE_URL}referenciel/all`,
            headers: {
                'Accept-Version': 1,
                Accept: 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json; charset=utf-8',
            },
            timeout: 60000,
        })

        if (response.status === 200) {
            const referenciels = renameKeys(response.data.data.referenciels)

            yield put(
                getAllReferencesActions.getAllReferenceSuccess({
                    categories: response.data.data.categories,
                    referenciels,
                })
            )
            yield put(getLoaderActions.disableGeneraleLoader())
        } else {
            yield put(getAllReferencesActions.getAllReferenceFailure(response))
            yield put(getLoaderActions.disableGeneraleLoader())
        }
    } catch (error) {
        yield put(
            getAllReferencesActions.getAllReferenceFailure(error.toString())
        )
        yield put(getLoaderActions.disableGeneraleLoader())
    }
}

export function* getAllReferencialSaga() {
    yield takeLatest(
        getAllReferenceTypes.GET_ALL_REFERENCE_REQUEST,
        getAllReferencialSagas
    )
    yield takeLatest(
        getAllReferenceTypes.GET_REFERENCE_BY_PAGINATION_REQUEST,
        getByPaginationReferencialSagas
    )
}
