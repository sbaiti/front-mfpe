import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'
/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
    getAllRolesRequest: ['response'],
    getAllRolesSuccess: ['response'],
    getAllRolesFailure: ['error'],
})

export const getAllRolesTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
    response: null,
    error: null,
    loading: null,
})

/* ------------- Reducers ------------- */
const getAllRolesSuccess = (state, { response }) =>
    state.merge({
        error: false,
        response,
        loading: false,
    })
const getAllRolesFailure = (state, { error }) =>
    state.merge({
        loading: false,
        error,
    })
const getAllRolesRequest = state => state.merge({ loading: true })

export const reducer = createReducer(INITIAL_STATE, {
    [Types.GET_ALL_ROLES_REQUEST]: getAllRolesRequest,
    [Types.GET_ALL_ROLES_SUCCESS]: getAllRolesSuccess,
    [Types.GET_ALL_ROLES_FAILURE]: getAllRolesFailure,
})
