import { call, put } from 'redux-saga/effects'

import * as AttractionsActions from '../actions/AttractionsActions'

import axios from 'axios'
import { api } from '../../config/uri/client'

// 查詢所有景點
export function* getScenicSpotList(action) { 
  // yield put(CommonActions.isLoading(true))
  try {
    const response = yield call(axios.post, '/api/getAttractionsList')
    const { status, data } = response

    if (status === 200) {
      yield put(AttractionsActions.getAttractionsListSuccess())
    } else {
      console.log('getScenicSpot Error')
    }

  } catch (error) {
    console.log(error)
  }
}

// 查詢所有餐廳
export function* getRestaurantList(action) {
  try {
    const response = yield call(axios.post, '/api/getRestaurantList')  
    const { status, data } = response

    if (status === 200) {
      yield put(AttractionsActions.getRestaurantListSuccess())
    } else {
      console.log('getRestaurantList Error')
    }

  } catch (error) {
    console.log(error)
  }
}

// 查詢所有旅館
export function* getHotelList(action) {
  try {
    const response = yield call(axios.post, '/api/getHotelList')  
    const { status, data } = response

    if (status === 200) {
      yield put(AttractionsActions.getHotelListSuccess())
    } else {
      console.log('getHotelList Error')
    }

  } catch (error) {
    console.log(error)
  }
}

// 查詢所有活動
export function* getActivityList(action) {
  try {
    const response = yield call(axios.post, '/api/getActivityList')  
    const { status, data } = response

    if (status === 200) {
      yield put(AttractionsActions.getActivityListSuccess())
    } else {
      console.log('getActivityList Error')
    }

  } catch (error) {
    console.log(error)
  }
}



