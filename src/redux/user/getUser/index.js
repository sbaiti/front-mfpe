import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'
/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
    getUserRequest: ['response'],
    getUserSuccess: ['response', 'loading'],
    getUserFailure: ['error'],
})

export const getUserTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
    response: {},
    error: null,
    loading: null,
})

/* ------------- Reducers ------------- */

const getUserSuccess = (state, { response }) =>
    state.merge({
        error: false,
        response,
        loading: false,
    })
const getUserFailure = (state, { error }) =>
    state.merge({
        loading: false,
        error,
    })
const getUserRequest = state => state.merge({ loading: true, error: null })

export const reducer = createReducer(INITIAL_STATE, {
    [Types.GET_USER_REQUEST]: getUserRequest,
    [Types.GET_USER_SUCCESS]: getUserSuccess,
    [Types.GET_USER_FAILURE]: getUserFailure,
})
