import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'
/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
    getAllCentersRequest: ['response'],
    getAllCentersSuccess: ['response', 'loading'],
    getAllCentersFailure: ['error'],
})

export const getAllCentersTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
    response: null,
    error: null,
    loading: null,
})

/* ------------- Reducers ------------- */

const getAllCentersSuccess = (state, { response }) =>
    state.merge({
        error: false,
        response,
        loading: false,
    })
const getAllCentersFailure = (state, { error }) =>
    state.merge({
        loading: false,
        error,
    })
const getAllCentersRequest = state =>
    state.merge({ loading: true, error: null })

export const reducer = createReducer(INITIAL_STATE, {
    [Types.GET_ALL_CENTERS_REQUEST]: getAllCentersRequest,
    [Types.GET_ALL_CENTERS_SUCCESS]: getAllCentersSuccess,
    [Types.GET_ALL_CENTERS_FAILURE]: getAllCentersFailure,
})
