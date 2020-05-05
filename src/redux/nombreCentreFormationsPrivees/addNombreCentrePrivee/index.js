import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
    addNombreCentreRequest: ['response'],
    addNombreCentreSuccess: ['response', 'loading'],
    addNombreCentreFailure: ['error'],
})

export const addNombreCentreTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
    success: null,
    response: null,
    error: null,
})

/* ------------- Reducers ------------- */

const addNombreCentreRequest = state => state.merge({ success: null })

const addNombreCentreSuccess = (state, { response }) =>
    state.merge({
        success: true,
        error: false,
        response,
    })

const addNombreCentreFailure = (state, { error }) => {
    const { response } = error
    return state.merge({
        success: false,
        error: true,
        response,
    })
}

export const reducer = createReducer(INITIAL_STATE, {
    [Types.ADD_NOMBRE_CENTRE_REQUEST]: addNombreCentreRequest,
    [Types.ADD_NOMBRE_CENTRE_SUCCESS]: addNombreCentreSuccess,
    [Types.ADD_NOMBRE_CENTRE_FAILURE]: addNombreCentreFailure,
})
