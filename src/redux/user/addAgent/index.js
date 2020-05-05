import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
    addAgentRequest: ['response'],
    addAgentSuccess: ['response', 'loading'],
    addAgentFailure: ['error'],
})

export const addAgentTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
    response: null,
    error: null,
})

/* ------------- Reducers ------------- */

const addAgentRequest = state => state.merge({ response: null })

const addAgentSuccess = (state, { response }) =>
    state.merge({
        error: false,
        response,
    })

const addAgentFailure = (state, { error }) => {
    const { response } = error
    return state.merge({
        error: true,
        response: response.data,
    })
}

export const reducer = createReducer(INITIAL_STATE, {
    [Types.ADD_AGENT_REQUEST]: addAgentRequest,
    [Types.ADD_AGENT_SUCCESS]: addAgentSuccess,
    [Types.ADD_AGENT_FAILURE]: addAgentFailure,
})
