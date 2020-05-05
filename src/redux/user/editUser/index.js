import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
    editUserRequest: ['response'],
    editUserSuccess: ['loading', 'response'],
    editUserFailure: ['error'],
})

export const editUserTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
    response: null,
    success: null,
    error: null,
    loading: null,
})

/* ------------- Reducers ------------- */

const editUserRequest = state => state.merge({ loading: true })

const editUserSuccess = (state, { response }) =>
    state.merge({
        loading: false,
        success: true,
        error: false,
        response,
    })

const editUserFailure = (state, { error }) => {
    const { response } = error
    return state.merge({
        loading: false,
        success: false,
        error: true,
        response,
    })
}

export const reducer = createReducer(INITIAL_STATE, {
    [Types.EDIT_USER_REQUEST]: editUserRequest,
    [Types.EDIT_USER_SUCCESS]: editUserSuccess,
    [Types.EDIT_USER_FAILURE]: editUserFailure,
})
