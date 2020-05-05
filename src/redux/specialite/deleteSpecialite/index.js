import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
    deleteSpecialiteRequest: ['response'],
    deleteSpecialiteSuccess: ['response'],
    deleteSpecialiteFailure: ['error'],
})

export const deleteSpecialiteTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
    response: null,
    error: null,
    loading: null,
})

/* ------------- Reducers ------------- */

const deleteSpecialiteRequest = state => state.merge({ success: null })

const deleteSpecialiteSuccess = (state, { response }) =>
    state.merge({
        success: true,
        error: false,
        response,
    })

const deleteSpecialiteFailure = (state, { error }) => {
    const { response } = error
    return state.merge({
        success: false,
        error: true,
        response,
    })
}
export const reducer = createReducer(INITIAL_STATE, {
    [Types.DELETE_SPECIALITE_REQUEST]: deleteSpecialiteRequest,
    [Types.DELETE_SPECIALITE_SUCCESS]: deleteSpecialiteSuccess,
    [Types.DELETE_SPECIALITE_FAILURE]: deleteSpecialiteFailure,
})
