/* eslint-disable import/no-named-as-default-member */
/* eslint-disable import/prefer-default-export */
import { takeLatest, put, all } from 'redux-saga/effects' // eslint-disable-line
import { goBack } from 'connected-react-router'
import addInvestmentProjectActions, {
    addInvestmentProjectTypes,
} from '../../../redux/investmentProjects/addInvestmentProject'

import { Post } from '../../../serveur/axios'
import alertActions from '../../../redux/alert'

function* addInvestmentProjectSagas({ response }) {
    try {
        const res = yield Post(`project_investment/`, response)
        if (res.status === 200 || res.status === 201) {
            yield all([
                yield put(
                    addInvestmentProjectActions.addInvestmentProjectSuccess(
                        res.data
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
            yield put(goBack())
        } else {
            yield put(
                addInvestmentProjectActions.addInvestmentProjectFailure(res)
            )
        }
    } catch (error) {
        yield put(
            addInvestmentProjectActions.addInvestmentProjectFailure(error)
        )
    }
}

export function* addInvestmentProjectSaga() {
    yield takeLatest(
        addInvestmentProjectTypes.ADD_INVESTMENT_PROJECT_REQUEST,
        addInvestmentProjectSagas
    )
}
