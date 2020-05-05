import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
    editUniteRegionaleRequest: ['response'],
    editUniteRegionaleSuccess: ['loading', 'response'],
    editUniteRegionaleFailure: ['error'],
})

export const editUniteRegionaleTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
    response: null,
    error: null,
    loading: null,
})

/* ------------- Reducers ------------- */

const editUniteRegionaleRequest = state => state.merge({ loading: true })

const editUniteRegionaleSuccess = (state, { loading }) => {
    const { data } = loading
    return state.merge({
        loading: false,
        error: false,
        response: data,
    })
}

const editUniteRegionaleFailure = (state, { error }) => {
    const { response } = error
    return state.merge({
        loading: false,
        error: true,
        response,
    })
}

export const reducer = createReducer(INITIAL_STATE, {
    [Types.EDIT_UNITE_REGIONALE_REQUEST]: editUniteRegionaleRequest,
    [Types.EDIT_UNITE_REGIONALE_SUCCESS]: editUniteRegionaleSuccess,
    [Types.EDIT_UNITE_REGIONALE_FAILURE]: editUniteRegionaleFailure,
})
