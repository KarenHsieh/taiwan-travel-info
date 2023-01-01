import { call, put } from 'redux-saga/effects'

import * as AttractionsActions from '../actions/AttractionsActions'

// import axios from 'axios'

import { formatDate } from '../../server/utils/tools'
import { axiosCall } from '../../server/utils/axios'

export function* getList({ payload }) {
  const { type, city, keyword, category, token } = payload

  const apiBaseUri = 'https://tdx.transportdata.tw/api/basic/v2/'
  const uri = {
    scenicSpot: `${apiBaseUri}Tourism/ScenicSpot`,
    restaurant: `${apiBaseUri}Tourism/Restaurant`,
    hotel: `${apiBaseUri}Tourism/Hotel`,
    activity: `${apiBaseUri}Tourism/Activity`,
  }

  let options = {}

  switch (type) {
    case 'scenicSpot': {
      options = {
        method: 'GET',
        url:
          uri.scenicSpot +
          (city ? '/' + city : '') +
          '?$filter=not(Class1 eq null) AND not(Picture eq null) AND not(City eq null)' +
          (keyword ? " AND (contains(ScenicSpotName, '" + keyword + "') OR contains(Keyword, '" + keyword + "')" : '') +
          (category ? "AND Class1 eq '" + category + "'" : '') +
          '&$orderby=ScenicSpotID asc&$format=JSON&$top=200',
      }

      break
    }
    case 'restaurant': {
      options = {
        method: 'GET',
        url:
          uri.restaurant +
          (city ? '/' + city : '') +
          '?$filter=not(Class eq null) AND not(Picture eq null) AND not(City eq null)' +
          (keyword && " AND contains(Name, '" + keyword + "')") +
          (category && " AND Class eq '" + category + "'") +
          '&$orderby=RestaurantID asc&$format=JSON&$top=200',
      }

      break
    }
    case 'activity': {
      options = {
        method: 'GET',
        url:
          uri.activity +
          (city ? '/' + city : '') +
          '?$filter=date(StartTime) ge ' +
          formatDate(new Date()) +
          (keyword && " AND contains(Name, '" + keyword + "')") +
          (category && " AND Class1 eq '" + category + "'") +
          '&$orderby=StartTime asc&$format=JSON&$top=200',
      }

      break
    }
    default: {
      options = {
        method: 'GET',
        url: `${uri.scenicSpot}${city ? `/${city}/` : ''}`,
      }
    }
  }

  try {
    const response = yield call(async () => {
      console.log('[debug] options.url')
      console.log(options.url)
      return await axiosCall(options, token)
    })

    options = {}
    console.log('[debug] response ==========')
    console.log(response)
    const { status, data = [] } = response
    // if (status === 429) {
    //   // 跳出 API 請求上限提示
    // }
    if (status === 200 && data && data.length) {
      yield put(AttractionsActions.getListSuccess(data, data.length))
    } else {
      yield put(AttractionsActions.getListError())
    }
  } catch (error) {
    console.error(`network fetch error - ${options.url} - ${error.message}`)
  }
}

export function* getRecentActivityListTop4({ payload }) {
  console.log('===> getRecentActivityListTop4 payload', payload)
  const token = payload
  const options = {
    method: 'GET',
    url:
      'https://tdx.transportdata.tw/api/basic/v2/Tourism/Activity?$filter=date(StartTime) ge ' +
      formatDate(new Date()) +
      '&$orderby=StartTime asc&$top=4&$format=JSON',
  }

  try {
    const response = yield call(async () => {
      return await axiosCall(options, token)
    })

    console.log('========== [debug] response ==========')
    console.log(response)
    const { status, data = [] } = response

    yield put(AttractionsActions.getRecentActivityListTop4Success(data))
  } catch (error) {
    console.error(`getRecentActivityListTop4 fetch error - ${options.url} - ${error.message}`)
  }
}

// 暫時保留不用
export function* getRecentActivityList({ payload }) {
  const token = payload
  const options = {
    method: 'GET',
    url: `https://tdx.transportdata.tw/api/basic/v2/Tourism/Activity?$filter=date(StartTime) ge ${formatDate(
      new Date()
    )}&$orderby=StartTime asc&$format=JSON`,
  }

  try {
    const response = yield call(async () => {
      return await axiosCall(options, token)
    })

    console.log('========== [debug] response ==========')
    console.log(response)
    const { status, data = [] } = response

    yield put(AttractionsActions.getRecentActivityListSuccess(data))
  } catch (error) {
    console.error(`getRecentActivityList fetch error - ${options.url} - ${error.message}`)
  }
}
