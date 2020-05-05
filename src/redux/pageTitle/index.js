import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
    setPageTitleRequest: ['title'],
})

export const setPageTitleTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
    title: '',
})

/* ------------- Reducers ------------- */

const setPageTitleRequest = (state, { title }) => {
    return state.merge({ title })
}

export const reducer = createReducer(INITIAL_STATE, {
    [Types.SET_PAGE_TITLE_REQUEST]: setPageTitleRequest,
})
