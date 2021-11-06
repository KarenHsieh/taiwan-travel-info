import * as actionTypes from '../constants'

export const getScenicspotList = city => ({
  type: actionTypes.GET_SCENICSPOT_LIST,
  payload: {
    city,
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

export const getScenicspotListSuccess = data => ({
  type: actionTypes.GET_SCENICSPOT_LIST_SUCCESS,
  payload: {
    data,
  },
})

export const getListFail = data => ({
  type: actionTypes.GET_LIST_FAIL,
  payload: data,
})
