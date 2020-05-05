import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
    editNotificationsRequest: ['response'],
    editNotificationsSuccess: ['loading', 'response'],
    editNotificationsFailure: ['error'],
})

export const editNotificationsTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
    response: null,
    success: null,
    error: null,
    loading: null,
})

/* ------------- Reducers ------------- */

const editNotificationsRequest = state => state.merge({ loading: true })

const editNotificationsSuccess = (state, { response }) =>
    state.merge({
        loading: false,
        success: true,
        error: false,
        response,
    })

const editNotificationsFailure = (state, { error }) => {
    const { response } = error
    return state.merge({
        loading: false,
        success: false,
        error: true,
        response,
    })
}

export const reducer = createReducer(INITIAL_STATE, {
    [Types.EDIT_NOTIFICATIONS_REQUEST]: editNotificationsRequest,
    [Types.EDIT_NOTIFICATIONS_SUCCESS]: editNotificationsSuccess,
    [Types.EDIT_NOTIFICATIONS_FAILURE]: editNotificationsFailure,
})
