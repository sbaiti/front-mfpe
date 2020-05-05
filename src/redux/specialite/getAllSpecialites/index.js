import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'
/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
    getAllSpecialitesRequest: ['response'],
    getAllSpecialitesSuccess: ['response', 'loading'],
    getAllSpecialitesFailure: ['error'],
})

export const getAllSpecialitesTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
    response: null,
    error: null,
    loading: null,
})

/* ------------- Reducers ------------- */

const getAllSpecialitesSuccess = (state, { response }) =>
    state.merge({
        error: false,
        response,
        loading: false,
    })
const getAllSpecialitesFailure = (state, { error }) =>
    state.merge({
        loading: false,
        error,
    })
const getAllSpecialitesRequest = state =>
    state.merge({ loading: true, error: null })

export const reducer = createReducer(INITIAL_STATE, {
    [Types.GET_ALL_SPECIALITES_REQUEST]: getAllSpecialitesRequest,
    [Types.GET_ALL_SPECIALITES_SUCCESS]: getAllSpecialitesSuccess,
    [Types.GET_ALL_SPECIALITES_FAILURE]: getAllSpecialitesFailure,
})
