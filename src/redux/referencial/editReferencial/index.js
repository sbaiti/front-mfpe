import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
    editReferenceRequest: ['response'],
    editReferenceSuccess: ['loading', 'response'],
    editReferenceFailure: ['error'],
})

export const editReferenceTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
    response: null,
    error: null,
    loading: null,
})

/* ------------- Reducers ------------- */

const editReferenceRequest = state => state.merge({ loading: true })

const editReferenceSuccess = (state, { response }) =>
    state.merge({
        error: false,
        response,
    })

const editReferenceFailure = (state, { response }) =>
    state.merge({
        loading: false,
        error: true,
        response,
    })

export const reducer = createReducer(INITIAL_STATE, {
    [Types.EDIT_REFERENCE_REQUEST]: editReferenceRequest,
    [Types.EDIT_REFERENCE_SUCCESS]: editReferenceSuccess,
    [Types.EDIT_REFERENCE_FAILURE]: editReferenceFailure,
})
