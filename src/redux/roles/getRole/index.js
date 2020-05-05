import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'
/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
    getRoleRequest: ['response'],
    getRoleSuccess: ['response', 'loading'],
    getRoleFailure: ['error'],
})

export const getRoleTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
    response: null,
    error: null,
    loading: false,
})

/* ------------- Reducers ------------- */

const getRoleSuccess = (state, { response }) =>
    state.merge({
        error: false,
        response,
        loading: false,
    })
const getRoleFailure = (state, { error }) =>
    state.merge({
        loading: false,
        error,
    })
const getRoleRequest = state => state.merge({ loading: true, error: null })

export const reducer = createReducer(INITIAL_STATE, {
    [Types.GET_ROLE_REQUEST]: getRoleRequest,
    [Types.GET_ROLE_SUCCESS]: getRoleSuccess,
    [Types.GET_ROLE_FAILURE]: getRoleFailure,
})
