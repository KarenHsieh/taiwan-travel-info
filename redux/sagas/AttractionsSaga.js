import { call, put } from 'redux-saga/effects'

import * as AttractionsActions from '../actions/AttractionsActions'

import axios from 'axios'

export function* getList({ payload }) {
  const { type, city, keyword, category } = payload

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
          apiUrl += `keyword=${keyword}&`
        }
        if (category) {
          apiUrl += `category=${category}`
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
          apiUrl += `keyword=${keyword}&`
        }

        if (category) {
          apiUrl += `category=${category}`
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
          apiUrl += `keyword=${keyword}&`
        }

        if (category) {
          apiUrl += `category=${category}`
        }
      }
      break
    }
    default: {
      apiUrl = '/api/getScenicSpotList'
    }
  }

  try {
    const response = yield call(axios.get, apiUrl)
    const { status, data } = response

    if (status === 200 && data?.result && data.result.length) {
      yield put(AttractionsActions.getListSuccess(data.result, data.dataCount))
    } else {
      yield put(AttractionsActions.getListError())
    }
  } catch (error) {
    console.log(error)
  }
}

// 查詢所有景點
// export function* getScenicSpotList({ filterCity }) {
//   try {
//     const response = yield call(axios.get, '/api/getAttractionsList')
//     const { status, data } = response

//     if (status === 200) {
//       yield put(AttractionsActions.getListSuccess(data.result))
//     } else {
//       console.log('getScenicSpot Error')
//     }
//   } catch (error) {
//     console.log(error)
//   }
// }

// 查詢所有餐廳
// export function* getRestaurantList(action) {
//   try {
//     const response = yield call(axios.get, '/api/getRestaurantList')
//     const { status, data } = response

//     if (status === 200) {
//       yield put(AttractionsActions.getRestaurantListSuccess())
//     } else {
//       console.log('getRestaurantList Error')
//     }
//   } catch (error) {
//     console.log(error)
//   }
// }

// 查詢所有旅館
// export function* getHotelList(action) {
//   try {
//     const response = yield call(axios.get, '/api/getHotelList')
//     const { status, data } = response

//     if (status === 200) {
//       yield put(AttractionsActions.getHotelListSuccess())
//     } else {
//       console.log('getHotelList Error')
//     }
//   } catch (error) {
//     console.log(error)
//   }
// }

// 查詢所有活動
// export function* getActivityList(action) {
//   try {
//     const response = yield call(axios.get, '/api/getActivityList')
//     const { status, data } = response

//     if (status === 200) {
//       yield put(AttractionsActions.getActivityListSuccess())
//     } else {
//       console.log('getActivityList Error')
//     }
//   } catch (error) {
//     console.log(error)
//   }
// }
