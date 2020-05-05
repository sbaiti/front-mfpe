import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
    addUserRequest: ['response'],
    addUserSuccess: ['response', 'loading'],
    addUserFailure: ['error'],
})

export const addUserTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
    response: null,
    error: null,
})

/* ------------- Reducers ------------- */

const addUserRequest = state => state.merge({ response: null })

const addUserSuccess = (state, { response }) =>
    state.merge({
        error: false,
        response,
    })

const addUserFailure = (state, { error }) => {
    const { response } = error
    return state.merge({
        error: true,
        response,
    })
}

export const reducer = createReducer(INITIAL_STATE, {
    [Types.ADD_USER_REQUEST]: addUserRequest,
    [Types.ADD_USER_SUCCESS]: addUserSuccess,
    [Types.ADD_USER_FAILURE]: addUserFailure,
})
