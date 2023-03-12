import * as actionTypes from '../constants'

export const getList = query => ({
  type: actionTypes.GET_LIST,
  payload: {
    type: query.type || '',
    city: query.city || '',
    keyword: query.keyword || '',
    category: query.class,
    token: query.token,
  },
})

export const getListSuccess = (results, dataCount) => ({
  type: actionTypes.GET_LIST_SUCCESS,
  payload: {
    results,
    dataCount,
  },
})

export const getListError = results => ({
  type: actionTypes.GET_LIST_ERROR,
})

export const clearList = () => ({
  type: actionTypes.CLEAR_LIST,
})

export const getRecentActivityListTop4 = token => {
  return {
    type: actionTypes.GET_RECENT_ACTIVITY_LIST_TOP4,
    payload: token,
  }
}

export const getRecentActivityListTop4Success = results => ({
  type: actionTypes.GET_RECENT_ACTIVITY_LIST_TOP4_SUCCESS,
  payload: results,
})

export const getRecentActivityList = token => {
  return {
    type: actionTypes.GET_RECENT_ACTIVITY_LIST,
    payload: token,
  }
}

export const getRecentActivityListSuccess = results => ({
  type: actionTypes.GET_RECENT_ACTIVITY_LIST_SUCCESS,
  payload: results,
})

export const serviceError = () => ({
  type: actionTypes.SERVICE_ERROR,
})
