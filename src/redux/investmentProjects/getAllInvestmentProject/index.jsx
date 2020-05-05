import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'
/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
    getAllInvestmentProjectRequest: ['response'],
    getAllInvestmentProjectSuccess: ['response', 'loading'],
    getAllInvestmentProjectFailure: ['error'],
})

export const getAllInvestmentProjectTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
    response: null,
    error: null,
    loading: null,
})

/* ------------- Reducers ------------- */

const getAllInvestmentProjectSuccess = (state, { response }) => {
    return state.merge({
        error: false,
        response,
        loading: false,
    })
}
const getAllInvestmentProjectFailure = (state, { error }) =>
    state.merge({
        loading: false,
        error,
    })
const getAllInvestmentProjectRequest = state =>
    state.merge({ loading: true, error: null })

export const reducer = createReducer(INITIAL_STATE, {
    [Types.GET_ALL_INVESTMENT_PROJECT_REQUEST]: getAllInvestmentProjectRequest,
    [Types.GET_ALL_INVESTMENT_PROJECT_SUCCESS]: getAllInvestmentProjectSuccess,
    [Types.GET_ALL_INVESTMENT_PROJECT_FAILURE]: getAllInvestmentProjectFailure,
})
