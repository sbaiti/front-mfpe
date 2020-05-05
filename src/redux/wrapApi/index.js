import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'
/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
    wrapApiPut: ['response'],
    wrapApiPutFailure: ['response'],
    wrapApiCall: ['request'],
    wrapApiCallFailure: ['request'],
    activeGeneraleLoader: ['response'],
    disableGeneraleLoader: ['response'],
})

export const wrapApiTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
    response: null,
    responseError: null,
    request: null,
    requestError: null,
    generalLoader: false,
})

/* ------------- Reducers ------------- */
const wrapApiPut = (state, { response }) =>
    state.merge({
        response,
        generalLoader: false,
    })
const wrapApiPutFailure = (state, { response }) =>
    state.merge({
        response,
        generalLoader: false,
    })
const wrapApiCall = (state, { request }) =>
    state.merge({
        request,
        generalLoader: true,
    })
const wrapApiCallFailure = (state, { request }) =>
    state.merge({
        request,
        generalLoader: false,
    })
const activeGeneraleLoader = state =>
    state.merge({
        generalLoader: true,
    })
const disableGeneraleLoader = state =>
    state.merge({
        generalLoader: false,
    })
export const reducer = createReducer(INITIAL_STATE, {
    [Types.WRAP_API_PUT]: wrapApiPut,
    [Types.WRAP_API_PUT_FAILURE]: wrapApiPutFailure,
    [Types.WRAP_API_CALL]: wrapApiCall,
    [Types.WRAP_API_CALL_FAILURE]: wrapApiCallFailure,
    [Types.DISABLE_GENERALE_LOADER]: disableGeneraleLoader,
    [Types.ACTIVE_GENERALE_LOADER]: activeGeneraleLoader,
})
