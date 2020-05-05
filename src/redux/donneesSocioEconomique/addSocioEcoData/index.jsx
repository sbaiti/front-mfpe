import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
    addSocioEcoDataRequest: ['response'],
    addSocioEcoDataSuccess: ['loading', 'response'],
    addSocioEcoDataFailure: ['error'],
})

export const addSocioEcoDataTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
    response: null,
    success: null,
    error: null,
})

/* ------------- Reducers ------------- */

const addSocioEcoDataRequest = state => state.merge({ success: null })

const addSocioEcoDataSuccess = (state, { response }) =>
    state.merge({
        success: true,
        error: false,
        response,
    })

const addSocioEcoDataFailure = (state, { error }) => {
    const { response } = error
    return state.merge({
        success: false,
        error: true,
        response,
    })
}

export const reducer = createReducer(INITIAL_STATE, {
    [Types.ADD_SOCIO_ECO_DATA_REQUEST]: addSocioEcoDataRequest,
    [Types.ADD_SOCIO_ECO_DATA_SUCCESS]: addSocioEcoDataSuccess,
    [Types.ADD_SOCIO_ECO_DATA_FAILURE]: addSocioEcoDataFailure,
})
