import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
    editRoleRequest: ['response'],
    editRoleSuccess: ['loading', 'response'],
    editRoleFailure: ['error'],
})

export const editRoleTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
    response: null,
    error: null,
    loading: null,
})

/* ------------- Reducers ------------- */

const editRoleRequest = state => state.merge({ loading: true })

const editRoleSuccess = (state, { loading }) => {
    const { data } = loading
    return state.merge({
        loading: false,
        error: false,
        response: data,
    })
}

const editRoleFailure = (state, { error }) => {
    const { response } = error
    return state.merge({
        loading: false,
        error: true,
        response,
    })
}

export const reducer = createReducer(INITIAL_STATE, {
    [Types.EDIT_ROLE_REQUEST]: editRoleRequest,
    [Types.EDIT_ROLE_SUCCESS]: editRoleSuccess,
    [Types.EDIT_ROLE_FAILURE]: editRoleFailure,
})
