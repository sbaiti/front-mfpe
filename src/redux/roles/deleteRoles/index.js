import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
    deleteRolesRequest: ['response'],
    deleteRolesSuccess: ['response'],
    deleteRolesFailure: ['error'],
})

export const deleteRolesTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
    response: null,
    error: null,
    loading: null,
})

/* ------------- Reducers ------------- */

const deleteRolesRequest = state => state.merge({ loading: true })

const deleteRolesSuccess = (state, { response }) =>
    state.merge({
        error: false,
        response,
        loading: false,
    })

const deleteRolesFailure = (state, { response }) =>
    state.merge({
        loading: false,
        error: true,
        response,
    })

export const reducer = createReducer(INITIAL_STATE, {
    [Types.DELETE_ROLES_REQUEST]: deleteRolesRequest,
    [Types.DELETE_ROLES_SUCCESS]: deleteRolesSuccess,
    [Types.DELETE_ROLES_FAILURE]: deleteRolesFailure,
})
