import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'
/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
    getHomePageDataRequest: ['response'],
    getHomePageDataSuccess: ['response'],
    getHomePageDataFailure: ['error'],
})

export const getHomePageDataTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
    response: null,
    error: null,
})

/* ------------- Reducers ------------- */
const getHomePageDataSuccess = (state, { response }) =>
    state.merge({
        error: false,
        response,
    })
const getHomePageDataFailure = state =>
    state.merge({
        error: true,
        response: false,
    })
const getHomePageDataRequest = state => state.merge()

export const reducer = createReducer(INITIAL_STATE, {
    [Types.GET_HOME_PAGE_DATA_REQUEST]: getHomePageDataRequest,
    [Types.GET_HOME_PAGE_DATA_SUCCESS]: getHomePageDataSuccess,
    [Types.GET_HOME_PAGE_DATA_FAILURE]: getHomePageDataFailure,
})
