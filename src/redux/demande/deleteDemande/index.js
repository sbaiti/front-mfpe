import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
    deleteDemandeRequest: ['response'],
    deleteDemandeSuccess: ['response'],
    deleteDemandeFailure: ['error'],
})

export const deleteDemandeTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
    response: null,
    error: null,
    loading: null,
})

/* ------------- Reducers ------------- */

const deleteDemandeRequest = state => state.merge({ loading: true })

const deleteDemandeSuccess = (state, { response }) =>
    state.merge({
        error: false,
        response,
        loading: false,
    })

const deleteDemandeFailure = (state, { response }) =>
    state.merge({
        loading: false,
        error: true,
        response,
    })

export const reducer = createReducer(INITIAL_STATE, {
    [Types.DELETE_DEMANDE_REQUEST]: deleteDemandeRequest,
    [Types.DELETE_DEMANDE_SUCCESS]: deleteDemandeSuccess,
    [Types.DELETE_DEMANDE_FAILURE]: deleteDemandeFailure,
})
