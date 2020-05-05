import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
    deleteUserRequest: ['response'],
    deleteUserSuccess: ['response'],
    deleteUserFailure: ['error'],
})

export const deleteUserTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
    response: null,
    error: null,
    loading: null,
})

/* ------------- Reducers ------------- */

const deleteUserRequest = state => state.merge({ loading: true })

const deleteUserSuccess = (state, { response }) =>
    state.merge({
        error: false,
        response,
        loading: false,
    })

const deleteUserFailure = (state, { response }) =>
    state.merge({
        loading: false,
        error: true,
        response,
    })

export const reducer = createReducer(INITIAL_STATE, {
    [Types.DELETE_USER_REQUEST]: deleteUserRequest,
    [Types.DELETE_USER_SUCCESS]: deleteUserSuccess,
    [Types.DELETE_USER_FAILURE]: deleteUserFailure,
})
