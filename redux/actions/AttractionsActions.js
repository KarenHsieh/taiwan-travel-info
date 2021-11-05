import * as actionTypes from '../constants'

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