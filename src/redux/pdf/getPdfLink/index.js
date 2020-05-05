import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'
/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
    getPdfLinkRequest: ['response'],
    getPdfLinkSuccess: ['response', 'loading'],
    getPdfLinkFailure: ['error'],
})

export const getPdfLinkTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
    response: null,
    error: null,
    loading: null,
})

/* ------------- Reducers ------------- */

const getPdfLinkSuccess = (state, { response }) =>
    state.merge({
        error: false,
        response,
        loading: false,
    })
const getPdfLinkFailure = (state, { error }) =>
    state.merge({
        error,
        response: false,
        loading: false,
    })
const getPdfLinkRequest = state =>
    state.merge({ response: null, error: null, loading: true })

export const reducer = createReducer(INITIAL_STATE, {
    [Types.GET_PDF_LINK_REQUEST]: getPdfLinkRequest,
    [Types.GET_PDF_LINK_SUCCESS]: getPdfLinkSuccess,
    [Types.GET_PDF_LINK_FAILURE]: getPdfLinkFailure,
})
