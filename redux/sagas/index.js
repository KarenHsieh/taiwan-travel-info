import * as actionTypes from '../constants'

import { all, takeEvery, takeLatest } from 'redux-saga/effects'

import * as AttractionsSaga from './AttractionsSaga'

function* rootSaga() {
  yield all([
    takeLatest(actionTypes.GET_LIST, AttractionsSaga.getList),
    takeLatest(actionTypes.GET_SCENICSPOT_LIST, AttractionsSaga.getScenicSpotList),
    takeLatest(actionTypes.GET_RESTAURANT_LIST, AttractionsSaga.getRestaurantList),
    takeLatest(actionTypes.GET_HOTEL_LIST, AttractionsSaga.getHotelList),
    takeLatest(actionTypes.GET_ACTIVITY_LIST, AttractionsSaga.getActivityList),
  ])
}

export default rootSaga
