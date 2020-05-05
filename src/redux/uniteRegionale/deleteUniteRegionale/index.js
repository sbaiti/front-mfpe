import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
    deleteUniteRegionaleRequest: ['response'],
    deleteUniteRegionaleSuccess: ['response'],
    deleteUniteRegionaleFailure: ['error'],
})

export const deleteUniteRegionaleTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
    response: null,
    error: null,
    loading: null,
})

/* ------------- Reducers ------------- */

const deleteUniteRegionaleRequest = state => state.merge({ loading: true })

const deleteUniteRegionaleSuccess = (state, { response }) =>
    state.merge({
        error: false,
        response,
        loading: false,
    })

const deleteUniteRegionaleFailure = (state, { response }) =>
    state.merge({
        loading: false,
        error: true,
        response,
    })

export const reducer = createReducer(INITIAL_STATE, {
    [Types.DELETE_UNITE_REGIONALE_REQUEST]: deleteUniteRegionaleRequest,
    [Types.DELETE_UNITE_REGIONALE_SUCCESS]: deleteUniteRegionaleSuccess,
    [Types.DELETE_UNITE_REGIONALE_FAILURE]: deleteUniteRegionaleFailure,
})
