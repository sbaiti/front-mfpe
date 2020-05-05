import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
    editCenterRequest: ['response'],
    editCenterSuccess: ['loading', 'response'],
    editCenterFailure: ['error'],
})

export const editCenterTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
    response: null,
    success: null,
    error: null,
    loading: null,
})

/* ------------- Reducers ------------- */

const editCenterRequest = state => state.merge({ loading: true })

const editCenterSuccess = (state, { response }) =>
    state.merge({
        loading: false,
        success: true,
        error: false,
        response,
    })

const editCenterFailure = (state, { error }) => {
    const { response } = error
    return state.merge({
        loading: false,
        success: false,
        error: true,
        response,
    })
}

export const reducer = createReducer(INITIAL_STATE, {
    [Types.EDIT_CENTER_REQUEST]: editCenterRequest,
    [Types.EDIT_CENTER_SUCCESS]: editCenterSuccess,
    [Types.EDIT_CENTER_FAILURE]: editCenterFailure,
})
