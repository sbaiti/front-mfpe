import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
    deleteAgentRequest: ['response'],
    deleteAgentSuccess: ['response', 'loading'],
    deleteAgentFailure: ['error'],
})

export const deleteAgentTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
    response: null,
    error: null,
})

/* ------------- Reducers ------------- */

const deleteAgentRequest = state => state.merge({ response: null })

const deleteAgentSuccess = (state, { response }) =>
    state.merge({
        error: false,
        response,
    })

const deleteAgentFailure = (state, { error }) => {
    const { response } = error
    return state.merge({
        error: true,
        response: response.data,
    })
}

export const reducer = createReducer(INITIAL_STATE, {
    [Types.DELETE_AGENT_REQUEST]: deleteAgentRequest,
    [Types.DELETE_AGENT_SUCCESS]: deleteAgentSuccess,
    [Types.DELETE_AGENT_FAILURE]: deleteAgentFailure,
})
