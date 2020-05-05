import { fork, all, call, take } from 'redux-saga/effects'
import { loginSaga } from './login/index'
import { getHomePageDataSaga } from './home'
import referencial from './referencial/index'
import { wrapApi } from './wrapApi/index'

import users from './user'
import pdfs from './pdf'
import demandes from './demande'
import uniteRegionales from './uniteRegionale'
import roles from './roles'
import specialite from './specialite'
import centreFormation from './centreFormation'
import CollectDataSagas from './collectData'
import ProjectsSagas from './projects'
import notification from './notification'
import nombreCentreFormationsPrivees from './nombreCentreFormationsPrivees'
import SocioDataSagas from './donneesSocioEconomique'
import BtsDataSagas from './donneesBts'
import InvestmentProjectsSagas from './investmentProjects'

export const takeFirst = (pattern, saga, ...args) =>
    fork(function* first() {
        while (true) {
            const action = yield take(pattern)
            yield call(saga, ...args.concat(action))
        }
    })

const sagas = [
    loginSaga,
    getHomePageDataSaga,
    wrapApi,
    ...referencial,
    ...users,
    ...pdfs,
    ...uniteRegionales,
    ...demandes,
    ...roles,
    ...specialite,
    ...centreFormation,
    ...CollectDataSagas,
    ...ProjectsSagas,
    ...notification,
    ...nombreCentreFormationsPrivees,
    ...SocioDataSagas,
    ...BtsDataSagas,
    ...InvestmentProjectsSagas,
]

function* globalSagas() {
    const globalSagasForks = sagas.map(saga => fork(saga))
    yield all([...globalSagasForks])
}

export default globalSagas
