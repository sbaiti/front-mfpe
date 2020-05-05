import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
    addRolesRequest: ['response'],
    addRolesSuccess: ['response', 'loading'],
    addRolesFailure: ['error'],
})

export const addRolesTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
    response: null,
    error: null,
    loading: null,
})

/* ------------- Reducers ------------- */

const addRolesRequest = state => state.merge({ response: null, loading: true })

const addRolesSuccess = (state, { response }) =>
    state.merge({
        error: false,
        response,
        loading: false,
    })

const addRolesFailure = (state, { error }) => {
    return state.merge({
        loading: false,
        error,
    })
}

export const reducer = createReducer(INITIAL_STATE, {
    [Types.ADD_ROLES_REQUEST]: addRolesRequest,
    [Types.ADD_ROLES_SUCCESS]: addRolesSuccess,
    [Types.ADD_ROLES_FAILURE]: addRolesFailure,
})
