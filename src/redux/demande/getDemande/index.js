import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'
/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
    getDemandeRequest: ['response'],
    getDemandeSuccess: ['response', 'loading'],
    getDemandeFailure: ['error'],
})

export const getDemandeTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
    response: null,
    error: null,
    loading: null,
})

/* ------------- Reducers ------------- */

const getDemandeSuccess = (state, { response }) =>
    state.merge({
        error: false,
        response,
        loading: false,
    })
const getDemandeFailure = (state, { error }) =>
    state.merge({
        loading: false,
        error,
    })
const getDemandeRequest = state => state.merge({ loading: true, error: null })

export const reducer = createReducer(INITIAL_STATE, {
    [Types.GET_DEMANDE_REQUEST]: getDemandeRequest,
    [Types.GET_DEMANDE_SUCCESS]: getDemandeSuccess,
    [Types.GET_DEMANDE_FAILURE]: getDemandeFailure,
})
