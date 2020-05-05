import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'
/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
    getAllPrivateCentersRequest: ['response'],
    getAllPrivateCentersSuccess: ['response', 'loading'],
    getAllPrivateCentersFailure: ['error'],
})

export const getAllPrivateCentersTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
    response: null,
    error: null,
    loading: null,
})

/* ------------- Reducers ------------- */

const getAllPrivateCentersSuccess = (state, { response }) => {
    return state.merge({
        error: false,
        response,
        loading: false,
    })
}
const getAllPrivateCentersFailure = (state, { error }) =>
    state.merge({
        loading: false,
        error,
    })
const getAllPrivateCentersRequest = state =>
    state.merge({ loading: true, error: null })

export const reducer = createReducer(INITIAL_STATE, {
    [Types.GET_ALL_PRIVATE_CENTERS_REQUEST]: getAllPrivateCentersRequest,
    [Types.GET_ALL_PRIVATE_CENTERS_SUCCESS]: getAllPrivateCentersSuccess,
    [Types.GET_ALL_PRIVATE_CENTERS_FAILURE]: getAllPrivateCentersFailure,
})
