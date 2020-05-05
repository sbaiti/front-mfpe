import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'
/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
    getAllDemandesRequest: ['response'],
    getAllDemandesSuccess: ['response', 'loading'],
    getAllDemandesFailure: ['error'],
})

export const getAllDemandesTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
    response: null,
    error: null,
    loading: null,
})

/* ------------- Reducers ------------- */

const getAllDemandesSuccess = (state, { response }) =>
    state.merge({
        error: false,
        response,
        loading: false,
    })
const getAllDemandesFailure = (state, { error }) =>
    state.merge({
        loading: false,
        error,
    })
const getAllDemandesRequest = state =>
    state.merge({ loading: true, error: null })

export const reducer = createReducer(INITIAL_STATE, {
    [Types.GET_ALL_DEMANDES_REQUEST]: getAllDemandesRequest,
    [Types.GET_ALL_DEMANDES_SUCCESS]: getAllDemandesSuccess,
    [Types.GET_ALL_DEMANDES_FAILURE]: getAllDemandesFailure,
})
