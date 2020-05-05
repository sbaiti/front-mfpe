import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
    addSpecialiteRequest: ['response'],
    addSpecialiteSuccess: ['response', 'loading'],
    addSpecialiteFailure: ['error'],
})

export const addSpecialiteTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
    success: null,
    response: null,
    error: null,
})

/* ------------- Reducers ------------- */

const addSpecialiteRequest = state => state.merge({ success: null })

const addSpecialiteSuccess = (state, { response }) =>
    state.merge({
        success: true,
        error: false,
        response,
    })

const addSpecialiteFailure = (state, { error }) => {
    const { response } = error
    return state.merge({
        success: false,
        error: true,
        response,
    })
}

export const reducer = createReducer(INITIAL_STATE, {
    [Types.ADD_SPECIALITE_REQUEST]: addSpecialiteRequest,
    [Types.ADD_SPECIALITE_SUCCESS]: addSpecialiteSuccess,
    [Types.ADD_SPECIALITE_FAILURE]: addSpecialiteFailure,
})
