import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
    alertShow: ['show', 'infos'],
    alertHide: [''],
})

export const alertTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
    show: false,
    infos: {},
})

/* ------------- Reducers ------------- */

const alertHide = state => state.merge({ show: false })

const alertShow = (state, { infos }) =>
    state.merge({
        infos,
        show: true,
    })

export const reducer = createReducer(INITIAL_STATE, {
    [Types.ALERT_SHOW]: alertShow,
    [Types.ALERT_HIDE]: alertHide,
})
