import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'
/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
    getArchiveRequest: ['response'],
    getArchiveSuccess: ['response', 'loading'],
    getArchiveFailure: ['error'],
})

export const getArchiveTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
    response: null,
    error: null,
    loading: null,
})

/* ------------- Reducers ------------- */

const getArchiveSuccess = (state, { response }) =>
    state.merge({
        error: false,
        response,
        loading: false,
    })
const getArchiveFailure = (state, { error }) =>
    state.merge({
        loading: false,
        error,
    })
const getArchiveRequest = state => state.merge({ loading: true, error: null })

export const reducer = createReducer(INITIAL_STATE, {
    [Types.GET_ARCHIVE_REQUEST]: getArchiveRequest,
    [Types.GET_ARCHIVE_SUCCESS]: getArchiveSuccess,
    [Types.GET_ARCHIVE_FAILURE]: getArchiveFailure,
})
