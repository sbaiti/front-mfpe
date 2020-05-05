import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
    addInvestmentProjectRequest: ['response'],
    addInvestmentProjectSuccess: ['loading', 'response'],
    addInvestmentProjectFailure: ['error'],
})

export const addInvestmentProjectTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
    response: null,
    success: null,
    error: null,
})

/* ------------- Reducers ------------- */

const addInvestmentProjectRequest = state => state.merge({ success: null })

const addInvestmentProjectSuccess = (state, { response }) =>
    state.merge({
        success: true,
        error: false,
        response,
    })

const addInvestmentProjectFailure = (state, { error }) => {
    const { response } = error
    return state.merge({
        success: false,
        error: true,
        response,
    })
}

export const reducer = createReducer(INITIAL_STATE, {
    [Types.ADD_INVESTMENT_PROJECT_REQUEST]: addInvestmentProjectRequest,
    [Types.ADD_INVESTMENT_PROJECT_SUCCESS]: addInvestmentProjectSuccess,
    [Types.ADD_INVESTMENT_PROJECT_FAILURE]: addInvestmentProjectFailure,
})
