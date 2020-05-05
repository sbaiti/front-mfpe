import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
    editDemandeRequest: ['response'],
    editDemandeSuccess: ['loading', 'response'],
    editDemandeFailure: ['error'],
})

export const editDemandeTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
    response: null,
    error: null,
    loading: null,
})

/* ------------- Reducers ------------- */

const editDemandeRequest = state => state.merge({ loading: true })

const editDemandeSuccess = (state, { loading }) => {
    const { data } = loading
    return state.merge({
        loading: false,
        error: false,
        response: data,
    })
}

const editDemandeFailure = (state, { error }) => {
    const { response } = error
    return state.merge({
        loading: false,
        error: true,
        response,
    })
}

export const reducer = createReducer(INITIAL_STATE, {
    [Types.EDIT_DEMANDE_REQUEST]: editDemandeRequest,
    [Types.EDIT_DEMANDE_SUCCESS]: editDemandeSuccess,
    [Types.EDIT_DEMANDE_FAILURE]: editDemandeFailure,
})
