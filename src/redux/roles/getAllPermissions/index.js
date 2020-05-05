import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'
/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
    getAllPermissionsRequest: ['response'],
    getAllPermissionsSuccess: ['response'],
    getAllPermissionsFailure: ['error'],
})

export const getAllPermissionsTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
    response: null,
    error: null,
    loading: false,
})

/* ------------- Reducers ------------- */
const getAllPermissionsSuccess = (state, { response }) =>
    state.merge({
        error: false,
        response,
        loading: false,
    })
const getAllPermissionsFailure = (state, { error }) =>
    state.merge({
        loading: false,
        error,
    })
const getAllPermissionsRequest = state => state.merge({ loading: true })

export const reducer = createReducer(INITIAL_STATE, {
    [Types.GET_ALL_PERMISSIONS_REQUEST]: getAllPermissionsRequest,
    [Types.GET_ALL_PERMISSIONS_SUCCESS]: getAllPermissionsSuccess,
    [Types.GET_ALL_PERMISSIONS_FAILURE]: getAllPermissionsFailure,
})
