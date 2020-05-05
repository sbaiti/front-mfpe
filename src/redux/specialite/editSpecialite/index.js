import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
    editSpecialiteRequest: ['response'],
    editSpecialiteSuccess: ['loading', 'response'],
    editSpecialiteFailure: ['error'],
})

export const editSpecialiteTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
    response: null,
    success: null,
    error: null,
})

/* ------------- Reducers ------------- */

const editSpecialiteRequest = state => state.merge({ success: null })

const editSpecialiteSuccess = (state, { response }) =>
    state.merge({
        success: true,
        error: false,
        response,
    })

const editSpecialiteFailure = (state, { error }) => {
    const { response } = error
    return state.merge({
        success: false,
        error: true,
        response,
    })
}

export const reducer = createReducer(INITIAL_STATE, {
    [Types.EDIT_SPECIALITE_REQUEST]: editSpecialiteRequest,
    [Types.EDIT_SPECIALITE_SUCCESS]: editSpecialiteSuccess,
    [Types.EDIT_SPECIALITE_FAILURE]: editSpecialiteFailure,
})
