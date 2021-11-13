import * as actionTypes from '../constants'

const initState = {
  // filterCity: '',
  // scenicSpotList: '',
  // restaurantList: '',
  // hotelList: '',
  // activityList: '',
  resultList: [],
  isLoading: false,
  error: false,
}

function AttractionsReducers(state = initState, action) {
  switch (action.type) {
    case actionTypes.GET_LIST: {
      return {
        ...state,
        ...action.payload,
        isLoading: true,
      }
    }

    case actionTypes.GET_LIST_SUCCESS: {
      return {
        ...state,
        resultList: action.payload.results,
        isLoading: false,
        error: false,
      }
    }

    case actionTypes.GET_LIST_ERROR: {
      return {
        ...state,
        isLoading: false,
        error: true,
      }
    }

    case actionTypes.GET_SCENICSPOT_LIST: {
      const { city } = action.payload
      return {
        ...state,
        filterCity: city,
      }
    }

    case actionTypes.GET_SCENICSPOT_LIST_SUCCESS: {
      const { data } = action.payload
      console.log('action.payload', action.payload)
      return {
        ...state,
        scenicSpotList: data,
      }
    }

    case actionTypes.GET_SCENICSPOT_LIST_FAIL: {
      const { status } = action.payload
      return {
        ...state,
        dataError: status && status === 404,
        pageError: status && status === 500,
      }
    }

    default:
      return state
  }
}

export default AttractionsReducers
