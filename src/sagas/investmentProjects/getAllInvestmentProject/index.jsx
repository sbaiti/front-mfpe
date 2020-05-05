/* eslint-disable import/no-named-as-default-member */
/* eslint-disable import/prefer-default-export */
import { takeLatest, put, all } from 'redux-saga/effects' // eslint-disable-line
import getAllInvestmentProjectActions, {
    getAllInvestmentProjectTypes,
} from '../../../redux/investmentProjects/getAllInvestmentProject'
import { Get } from '../../../serveur/axios'
import alertActions from '../../../redux/alert'

function* getAllInvestmentProjectSagas({ response }) {
    try {
        const res = yield Get(`project_investment/?type=${response.type}`)
        if (res.status === 200 || res.status === 201) {
            yield all([
                yield put(
                    getAllInvestmentProjectActions.getAllInvestmentProjectSuccess(
                        res.data.data
                    )
                ),

                yield put(
                    alertActions.alertShow(true, {
                        onConfirm: false,
                        warning: false,
                        info: false,
                        error: false,
                        success: true,
                        message: response.intl.formatMessage({
                            id: 'successSagaMessage',
                        }),
                        title: response.intl.formatMessage({
                            id: 'successSagaTitle',
                        }),
                    })
                ),
            ])
        } else {
            yield put(
                getAllInvestmentProjectActions.getAllInvestmentProjectFailure(
                    res
                )
            )
        }
    } catch (error) {
        yield put(
            getAllInvestmentProjectActions.getAllInvestmentProjectFailure(error)
        )
    }
}

export function* getAllInvestmentProjectSaga() {
    yield takeLatest(
        getAllInvestmentProjectTypes.GET_ALL_INVESTMENT_PROJECT_REQUEST,
        getAllInvestmentProjectSagas
    )
}
