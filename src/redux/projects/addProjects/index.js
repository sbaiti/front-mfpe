import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
    addProjectsRequest: ['response'],
    addProjectsSuccess: ['loading', 'response'],
    addProjectsFailure: ['error'],
})

export const addProjectsTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
    response: null,
    success: null,
    error: null,
})

/* ------------- Reducers ------------- */

const addProjectsRequest = state => state.merge({ success: null })

const addProjectsSuccess = (state, { response }) =>
    state.merge({
        success: true,
        error: false,
        response,
    })

const addProjectsFailure = (state, { error }) => {
    const { response } = error
    return state.merge({
        success: false,
        error: true,
        response,
    })
}

export const reducer = createReducer(INITIAL_STATE, {
    [Types.ADD_PROJECTS_REQUEST]: addProjectsRequest,
    [Types.ADD_PROJECTS_SUCCESS]: addProjectsSuccess,
    [Types.ADD_PROJECTS_FAILURE]: addProjectsFailure,
})
