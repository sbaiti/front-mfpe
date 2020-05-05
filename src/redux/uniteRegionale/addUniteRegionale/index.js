import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
    addUniteRegionaleRequest: ['response'],
    addUniteRegionaleSuccess: ['response', 'loading'],
    addUniteRegionaleFailure: ['error'],
})

export const addUniteRegionaleTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
    response: null,
    error: null,
    loading: null,
})

/* ------------- Reducers ------------- */

const addUniteRegionaleRequest = state => state.merge({ loading: true })

const addUniteRegionaleSuccess = (state, { response }) =>
    state.merge({
        error: false,
        loading: false,
        response,
    })

const addUniteRegionaleFailure = (state, { error }) => {
    const { response } = error
    return state.merge({
        loading: false,
        error: true,
        response,
    })
}

export const reducer = createReducer(INITIAL_STATE, {
    [Types.ADD_UNITE_REGIONALE_REQUEST]: addUniteRegionaleRequest,
    [Types.ADD_UNITE_REGIONALE_SUCCESS]: addUniteRegionaleSuccess,
    [Types.ADD_UNITE_REGIONALE_FAILURE]: addUniteRegionaleFailure,
})
