import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
    uploadSocioEcoFileRequest: ['response'],
    uploadSocioEcoFileSuccess: ['loading', 'response'],
    uploadSocioEcoFileFailure: ['error'],
})

export const uploadSocioEcoFileTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
    response: null,
    success: null,
    error: null,
    loading: null,
})

/* ------------- Reducers ------------- */

const uploadSocioEcoFileRequest = state =>
    state.merge({ success: null, loading: true })

const uploadSocioEcoFileSuccess = (state, { response }) =>
    state.merge({
        success: true,
        error: false,
        loading: false,
        response,
    })

const uploadSocioEcoFileFailure = (state, { error }) => {
    const { response } = error
    return state.merge({
        success: false,
        error: true,
        loading: false,
        response,
    })
}

export const reducer = createReducer(INITIAL_STATE, {
    [Types.UPLOAD_SOCIO_ECO_FILE_REQUEST]: uploadSocioEcoFileRequest,
    [Types.UPLOAD_SOCIO_ECO_FILE_SUCCESS]: uploadSocioEcoFileSuccess,
    [Types.UPLOAD_SOCIO_ECO_FILE_FAILURE]: uploadSocioEcoFileFailure,
})
