import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
    changePasswordRequest: ['response'],
    changePasswordSuccess: ['response', 'loading'],
    changePasswordFailure: ['error'],
})

export const changePasswordTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
    response: null,
    success: null,
    error: null,
    loading: null,
})

/* ------------- Reducers ------------- */

const changePasswordRequest = state => state.merge({ loading: true })

const changePasswordSuccess = (state, { response }) =>
    state.merge({
        error: false,
        success: true,
        loading: false,
        response,
    })

const changePasswordFailure = (state, { error }) => {
    const { response } = error
    return state.merge({
        loading: false,
        success: false,
        error: true,
        response,
    })
}

export const reducer = createReducer(INITIAL_STATE, {
    [Types.CHANGE_PASSWORD_REQUEST]: changePasswordRequest,
    [Types.CHANGE_PASSWORD_SUCCESS]: changePasswordSuccess,
    [Types.CHANGE_PASSWORD_FAILURE]: changePasswordFailure,
})
