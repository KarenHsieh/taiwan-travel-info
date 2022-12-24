import * as actionTypes from '../constants'

import { all, takeEvery, takeLatest } from 'redux-saga/effects'

import * as AttractionsSaga from './AttractionsSaga'

function* rootSaga() {
  yield all([takeLatest(actionTypes.GET_LIST, AttractionsSaga.getList)])
  yield all([takeLatest(actionTypes.GET_RECENT_ACTIVITY_LIST_TOP4, AttractionsSaga.getRecentActivityListTop4)])
}

export default rootSaga
