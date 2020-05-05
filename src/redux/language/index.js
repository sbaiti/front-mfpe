import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'
/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
    changeLanguage: ['language'],
})

export const languageTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
    language: 'ar',
})

/* ------------- Reducers ------------- */
const changeLanguage = (state, { language }) =>
    state.merge({
        language,
    })

export const reducer = createReducer(INITIAL_STATE, {
    [Types.CHANGE_LANGUAGE]: changeLanguage,
})
