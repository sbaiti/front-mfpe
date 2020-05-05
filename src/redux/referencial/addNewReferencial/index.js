import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
    addNewReferenceRequest: ['response'],
    addNewReferenceSuccess: ['response', 'loading'],
    addNewReferenceFailure: ['error'],
})

export const addNewReferenceTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
    response: null,
    error: null,
    loading: null,
})

/* ------------- Reducers ------------- */

const addNewReferenceRequest = state => state.merge({ loading: true })

const addNewReferenceSuccess = (state, { response }) =>
    state.merge({
        error: false,
        response,
        success: true,
    })

const addNewReferenceFailure = (state, { response }) => {
    return state.merge({
        loading: false,
        error: true,
        response,
    })
}

export const reducer = createReducer(INITIAL_STATE, {
    [Types.ADD_NEW_REFERENCE_REQUEST]: addNewReferenceRequest,
    [Types.ADD_NEW_REFERENCE_SUCCESS]: addNewReferenceSuccess,
    [Types.ADD_NEW_REFERENCE_FAILURE]: addNewReferenceFailure,
})
