import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
    resetPasswordRequest: ['response'],
    resetPasswordSuccess: ['response', 'loading'],
    resetPasswordFailure: ['error'],
})

export const resetPasswordTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
    response: null,
    success: null,
    error: null,
    loading: null,
})

/* ------------- Reducers ------------- */

const resetPasswordRequest = state => state.merge({ loading: true })

const resetPasswordSuccess = (state, { response }) =>
    state.merge({
        loading: false,
        success: true,
        error: false,
        response,
    })

const resetPasswordFailure = (state, { error }) => {
    const { response } = error
    return state.merge({
        loading: false,
        success: false,
        error: true,
        response,
    })
}

export const reducer = createReducer(INITIAL_STATE, {
    [Types.RESET_PASSWORD_REQUEST]: resetPasswordRequest,
    [Types.RESET_PASSWORD_SUCCESS]: resetPasswordSuccess,
    [Types.RESET_PASSWORD_FAILURE]: resetPasswordFailure,
})
