import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'
/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
    getAllProjectsRequest: ['response'],
    getAllProjectsSuccess: ['response', 'loading'],
    getAllProjectsFailure: ['error'],
})

export const getAllProjectsTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
    response: null,
    error: null,
    loading: null,
})

/* ------------- Reducers ------------- */

const getAllProjectsSuccess = (state, { response }) => {
    return state.merge({
        error: false,
        response,
        loading: false,
    })
}
const getAllProjectsFailure = (state, { error }) =>
    state.merge({
        loading: false,
        error,
    })
const getAllProjectsRequest = state =>
    state.merge({ loading: true, error: null })

export const reducer = createReducer(INITIAL_STATE, {
    [Types.GET_ALL_PROJECTS_REQUEST]: getAllProjectsRequest,
    [Types.GET_ALL_PROJECTS_SUCCESS]: getAllProjectsSuccess,
    [Types.GET_ALL_PROJECTS_FAILURE]: getAllProjectsFailure,
})
