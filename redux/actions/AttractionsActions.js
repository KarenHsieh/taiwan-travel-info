import * as actionTypes from '../constants'

export const getList = query => {
  console.log('getList query = ')
  console.log(query)
  return {
    type: actionTypes.GET_LIST,
    payload: {
      type: query.type || '',
      city: query.city || '',
      keyword: query.keyword || '',
    },
  }
}

export const getListSuccess = (results, dataCount) => ({
  type: actionTypes.GET_LIST_SUCCESS,
  payload: {
    results,
    dataCount,
  },
})

export const getListError = results => ({
  type: actionTypes.GET_LIST_ERROR,
  payload: {
    results,
  },
})

export const getScenicspotList = city => ({
  type: actionTypes.GET_SCENICSPOT_LIST,
  payload: {
    city,
  },
})

export const getScenicspotListSuccess = data => ({
  type: actionTypes.GET_SCENICSPOT_LIST_SUCCESS,
  payload: {
    data,
  },
})

export const getRestaurantList = city => ({
  type: actionTypes.GET_RESTAURANT_LIST,
  payload: {
    city,
  },
})

export const getHotelList = city => ({
  type: actionTypes.GET_HOTEL_LIST,
  payload: {
    city,
  },
})

export const getActivityList = city => ({
  type: actionTypes.GET_ACTIVITY_LIST,
  payload: {
    city,
  },
})
