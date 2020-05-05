import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
    getSocioEcoDataRequest: ['loading'],
    getSocioEcoDataSuccess: ['response'],
    getSocioEcoDataFailure: ['error'],
})

export const getSocioEcoDataTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
    response: null,
    success: null,
    error: null,
})

/* ------------- Reducers ------------- */

const getSocioEcoDataRequest = state => {
    return state.merge({ success: null })
}

const getSocioEcoDataSuccess = (state, { response }) => {
    return state.merge({
        success: true,
        error: false,
        response: response.data.data,
    })
}

const getSocioEcoDataFailure = (state, { error }) => {
    const { response } = error
    return state.merge({
        success: false,
        error: true,
        response,
    })
}

export const reducer = createReducer(INITIAL_STATE, {
    [Types.GET_SOCIO_ECO_DATA_REQUEST]: getSocioEcoDataRequest,
    [Types.GET_SOCIO_ECO_DATA_SUCCESS]: getSocioEcoDataSuccess,
    [Types.GET_SOCIO_ECO_DATA_FAILURE]: getSocioEcoDataFailure,
})
