import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
    deleteReferenceRequest: ['response'],
    deleteReferenceSuccess: ['response'],
    deleteReferenceFailure: ['error'],
})

export const deleteReferenceTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
    response: null,
    error: null,
    loading: null,
})

/* ------------- Reducers ------------- */

const deleteReferenceRequest = state => state.merge({ loading: true })

const deleteReferenceSuccess = (state, { response }) =>
    state.merge({
        error: false,
        response,
        loading: false,
    })

const deleteReferenceFailure = (state, { response }) =>
    state.merge({
        loading: false,
        error: true,
        response,
    })

export const reducer = createReducer(INITIAL_STATE, {
    [Types.DELETE_REFERENCE_REQUEST]: deleteReferenceRequest,
    [Types.DELETE_REFERENCE_SUCCESS]: deleteReferenceSuccess,
    [Types.DELETE_REFERENCE_FAILURE]: deleteReferenceFailure,
})
