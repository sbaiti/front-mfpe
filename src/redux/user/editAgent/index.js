import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
    editAgentRequest: ['response'],
    editAgentSuccess: ['response', 'loading'],
    editAgentFailure: ['error'],
})

export const editAgentTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
    response: null,
    error: null,
})

/* ------------- Reducers ------------- */

const editAgentRequest = state => state.merge({ response: null })

const editAgentSuccess = (state, { response }) =>
    state.merge({
        error: false,
        response,
    })

const editAgentFailure = (state, { error }) => {
    const { response } = error
    return state.merge({
        error: true,
        response: response.data,
    })
}

export const reducer = createReducer(INITIAL_STATE, {
    [Types.EDIT_AGENT_REQUEST]: editAgentRequest,
    [Types.EDIT_AGENT_SUCCESS]: editAgentSuccess,
    [Types.EDIT_AGENT_FAILURE]: editAgentFailure,
})
