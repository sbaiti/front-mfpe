import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'
/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
    getAllNotificationsRequest: ['response'],
    getAllNotificationsSuccess: ['response', 'loading'],
    getAllNotificationsFailure: ['error'],
})

export const getAllNotificationsTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
    response: null,
    error: null,
    loading: null,
})

/* ------------- Reducers ------------- */

const getAllNotificationsSuccess = (state, { response }) =>
    state.merge({
        error: false,
        response,
        loading: false,
    })
const getAllNotificationsFailure = (state, { error }) =>
    state.merge({
        loading: false,
        error,
    })
const getAllNotificationsRequest = state =>
    state.merge({ loading: true, error: null })

export const reducer = createReducer(INITIAL_STATE, {
    [Types.GET_ALL_NOTIFICATIONS_REQUEST]: getAllNotificationsRequest,
    [Types.GET_ALL_NOTIFICATIONS_SUCCESS]: getAllNotificationsSuccess,
    [Types.GET_ALL_NOTIFICATIONS_FAILURE]: getAllNotificationsFailure,
})
