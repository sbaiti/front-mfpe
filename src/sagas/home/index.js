/* eslint-disable import/prefer-default-export */
import { takeLatest, put } from 'redux-saga/effects'
import axios from 'axios'
import getHomePageDataActions, { getHomePageDataTypes } from '../../redux/home'
import getLoaderActions from '../../redux/wrapApi'

function* getHomePageDataSagas() {
    try {
        yield put(getLoaderActions.activeGeneraleLoader())
        const res = yield axios({
            method: 'get',
            url: `${process.env.REACT_APP_BASE_URL}home/roues`,
            headers: {
                'Accept-Version': 1,
                Accept: 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json; charset=utf-8',
            },
            timeout: 60000,
        })

        if (res.status === 200) {
            yield put(
                getHomePageDataActions.getHomePageDataSuccess(res.data.data)
            )
            yield put(getLoaderActions.disableGeneraleLoader())
        } else {
            yield put(getHomePageDataActions.getHomePageDataFailure(res))
            yield put(getLoaderActions.disableGeneraleLoader())
        }
    } catch (error) {
        yield put(getHomePageDataActions.getHomePageDataFailure(error))
    }
}

export function* getHomePageDataSaga() {
    yield takeLatest(
        getHomePageDataTypes.GET_HOME_PAGE_DATA_REQUEST,
        getHomePageDataSagas
    )
}
