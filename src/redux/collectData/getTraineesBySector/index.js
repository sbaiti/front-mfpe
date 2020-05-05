import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
    getTraineesBySectorRequest: ['payload'],
    getTraineesBySectorSuccess: ['response'],
    getTraineesBySectorFailure: ['error'],
})

export const getTraineesBySectorTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
    response: null,
    success: null,
    error: null,
})

/* ------------- Reducers ------------- */

const getTraineesBySectorRequest = state => state.merge({ success: null })

const getTraineesBySectorSuccess = (state, { response }) =>
    state.merge({
        success: true,
        error: false,
        response,
    })

const getTraineesBySectorFailure = (state, { error }) => {
    const { response } = error
    return state.merge({
        success: false,
        error: true,
        response,
    })
}

export const reducer = createReducer(INITIAL_STATE, {
    [Types.GET_TRAINEES_BY_SECTOR_REQUEST]: getTraineesBySectorRequest,
    [Types.GET_TRAINEES_BY_SECTOR_SUCCESS]: getTraineesBySectorSuccess,
    [Types.GET_TRAINEES_BY_SECTOR_FAILURE]: getTraineesBySectorFailure,
})
