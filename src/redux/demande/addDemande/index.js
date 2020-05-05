import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
    addDemandeRequest: ['response'],
    addDemandeSuccess: ['response'],
    addDemandeFailure: ['error'],
})

export const addDemandeTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
    response: null,
    error: null,
    loading: null,
})

/* ------------- Reducers ------------- */

const addDemandeRequest = state =>
    state.merge({ response: null, loading: true })

const addDemandeSuccess = (state, { response }) =>
    state.merge({
        error: false,
        response,
        loading: false,
    })

const addDemandeFailure = (state, { error }) => {
    const { response } = error
    return state.merge({
        error: true,
        response,
        loading: false,
    })
}

export const reducer = createReducer(INITIAL_STATE, {
    [Types.ADD_DEMANDE_REQUEST]: addDemandeRequest,
    [Types.ADD_DEMANDE_SUCCESS]: addDemandeSuccess,
    [Types.ADD_DEMANDE_FAILURE]: addDemandeFailure,
})
