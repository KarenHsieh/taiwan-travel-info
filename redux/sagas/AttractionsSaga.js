import { call, put } from 'redux-saga/effects'

import * as AttractionsActions from '../actions/AttractionsActions'

import axios from 'axios'
// import { api } from '../../config/uri/client'

export function* getList({ payload }) {
  const { type, city, keyword } = payload

  let apiUrl = ''
  switch (type) {
    case 'scenicSpot': {
      apiUrl = '/api/getScenicSpotList'
      if (city || keyword) {
        apiUrl += '?'
        if (city) {
          apiUrl += `city=${city}&`
        }

        if (keyword) {
          apiUrl += `keyword=${keyword}`
        }
      }
      break
    }
    case 'restaurant': {
      apiUrl = '/api/getRestaurantList'
      if (city || keyword) {
        apiUrl += '?'
        if (city) {
          apiUrl += `city=${city}&`
        }

        if (keyword) {
          apiUrl += `keyword=${keyword}`
        }
      }
      break
    }
    case 'activity': {
      apiUrl = '/api/getActivityList'
      if (city || keyword) {
        apiUrl += '?'
        if (city) {
          apiUrl += `city=${city}&`
        }

        if (keyword) {
          apiUrl += `keyword=${keyword}`
        }
      }
      break
    }
    default: {
      apiUrl = '/api/getScenicSpotList'
    }
  }

  console.log('========apiUrl========')
  console.log(apiUrl)

  try {
    const response = yield call(axios.get, apiUrl)
    const { status, data } = response
    if (status === 200) {
      yield put(AttractionsActions.getListSuccess(data.result))
    } else {
      yield put(AttractionsActions.getListError())
    }
  } catch (error) {
    console.log(error)
  }
}

// 查詢所有景點

export function* getScenicSpotList({ filterCity }) {
  console.log('filterCity', filterCity)
  // yield put(CommonActions.isLoading(true))
  try {
    const response = yield call(axios.get, '/api/getAttractionsList')
    const { status, data } = response

    if (status === 200) {
      yield put(AttractionsActions.getListSuccess(data.result))
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
    const response = yield call(axios.get, '/api/getRestaurantList')
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
    const response = yield call(axios.get, '/api/getHotelList')
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
    const response = yield call(axios.get, '/api/getActivityList')
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
