import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
    uploadBtsFileRequest: ['response'],
    uploadBtsFileSuccess: ['loading', 'response'],
    uploadBtsFileFailure: ['error'],
})

export const uploadBtsFileTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
    response: null,
    success: null,
    error: null,
    loading: null,
})

/* ------------- Reducers ------------- */

const uploadBtsFileRequest = state =>
    state.merge({ success: null, loading: true })

const uploadBtsFileSuccess = (state, { response }) =>
    state.merge({
        success: true,
        error: false,
        loading: false,
        response,
    })

const uploadBtsFileFailure = (state, { error }) => {
    const { response } = error
    return state.merge({
        success: false,
        error: true,
        loading: false,
        response,
    })
}

export const reducer = createReducer(INITIAL_STATE, {
    [Types.UPLOAD_BTS_FILE_REQUEST]: uploadBtsFileRequest,
    [Types.UPLOAD_BTS_FILE_SUCCESS]: uploadBtsFileSuccess,
    [Types.UPLOAD_BTS_FILE_FAILURE]: uploadBtsFileFailure,
})
