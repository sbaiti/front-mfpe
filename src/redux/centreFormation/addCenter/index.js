import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
    addCenterRequest: ['response'],
    addCenterSuccess: ['response', 'loading'],
    addCenterFailure: ['error'],
})

export const addCenterTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
    response: null,
    error: null,
    loading: null,
})

/* ------------- Reducers ------------- */

const addCenterRequest = state => state.merge({ loading: true })

const addCenterSuccess = (state, { response }) =>
    state.merge({
        error: false,
        loading: false,
        response,
    })

const addCenterFailure = (state, { error }) => {
    const { response } = error
    return state.merge({
        loading: false,
        error: true,
        response,
    })
}

export const reducer = createReducer(INITIAL_STATE, {
    [Types.ADD_CENTER_REQUEST]: addCenterRequest,
    [Types.ADD_CENTER_SUCCESS]: addCenterSuccess,
    [Types.ADD_CENTER_FAILURE]: addCenterFailure,
})
