import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web and AsyncStorage for react-native
import { reducer as login } from './login'
import { reducer as home } from './home'
import { reducer as wrapApi } from './wrapApi'
import referencial from './referencial'
import user from './user'
import pdf from './pdf'
import demande from './demande'
import uniteRegionale from './uniteRegionale'
import specialite from './specialite'
import collectData from './collectData'
import centreFormation from './centreFormation'
import notification from './notification'
import projects from './projects'
import SocioData from './donneesSocioEconomique'
import btsData from './donneesBts'
import InvestmentProject from './investmentProjects'
import { reducer as info } from './language'

import { reducer as alert } from './alert'
import { reducer as pageTitle } from './pageTitle'

import roles from './roles'

import ImmutablePersistenceTransform from './ImmutablePersistenceTransform'
import nombreCentreFormationsPrivees from './nombreCentreFormationsPrivees'

const containersReducer = {
    alert,
    pageTitle,
    login,
    wrapApi,
    referencial,
    roles,
    info,
    user,
    pdf,
    demande,
    uniteRegionale,
    specialite,
    centreFormation,
    collectData,
    notification,
    nombreCentreFormationsPrivees,
    projects,
    SocioData,
    btsData,
    InvestmentProject,
    home,
}

const persistConfig = {
    key: 'root',
    storage,
    transforms: [ImmutablePersistenceTransform],
    whitelist: [
        'login',
        'referencial',
        'info',
        'router',
        'specialite',
        'centreFormation',
        'demande',
        'nombreCentreFormationsPrivees',
    ],
}
const appReducer = combineReducers({
    ...containersReducer,
    router: routerReducer,
})

export const rootReducer = (state, action) => {
    if (action.type === 'SIGNOUT_REQUEST') {
        Object.keys(state).forEach(key => {
            storage.removeItem(`persist:${key}`)
        })
        /*eslint-disable */
        const { referencial, info, home } = state
        state = undefined
        state = { referencial, info, home }

        localStorage.setItem('mfpeToken', '')
    }
    return appReducer(state, action)
}

const createGlobalReducer = () => persistReducer(persistConfig, rootReducer)
export default createGlobalReducer
