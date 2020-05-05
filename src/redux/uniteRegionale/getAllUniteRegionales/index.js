import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'
/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
    getAllUniteRegionalesRequest: ['response'],
    getAllUniteRegionalesSuccess: ['response', 'loading'],
    getAllUniteRegionalesFailure: ['error'],
})

export const getAllUniteRegionalesTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
    response: null,
    error: null,
    loading: null,
})

/* ------------- Reducers ------------- */

const getAllUniteRegionalesSuccess = (state, { response }) =>
    state.merge({
        error: false,
        response,
        loading: false,
    })
const getAllUniteRegionalesFailure = (state, { error }) =>
    state.merge({
        loading: false,
        error,
    })
const getAllUniteRegionalesRequest = state =>
    state.merge({ loading: true, error: null })

export const reducer = createReducer(INITIAL_STATE, {
    [Types.GET_ALL_UNITE_REGIONALES_REQUEST]: getAllUniteRegionalesRequest,
    [Types.GET_ALL_UNITE_REGIONALES_SUCCESS]: getAllUniteRegionalesSuccess,
    [Types.GET_ALL_UNITE_REGIONALES_FAILURE]: getAllUniteRegionalesFailure,
})
