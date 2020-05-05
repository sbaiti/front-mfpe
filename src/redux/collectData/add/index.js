import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
    addRequest: ['response'],
    addSuccess: ['loading', 'response'],
    addFailure: ['error'],
})

export const addTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
    response: null,
    success: null,
    error: null,
})

/* ------------- Reducers ------------- */

const addRequest = state => state.merge({ success: null })

const addSuccess = (state, { response }) =>
    state.merge({
        success: true,
        error: false,
        response,
    })

const addFailure = (state, { error }) => {
    const { response } = error
    return state.merge({
        success: false,
        error: true,
        response,
    })
}

export const reducer = createReducer(INITIAL_STATE, {
    [Types.ADD_REQUEST]: addRequest,
    [Types.ADD_SUCCESS]: addSuccess,
    [Types.ADD_FAILURE]: addFailure,
})
