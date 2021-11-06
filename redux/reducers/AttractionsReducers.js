import * as actionTypes from '../constants'

const initState = {
  filterCity: '',
  scenicSpotList: {},
  restaurantList: {},
  hotelList: {},
  activityList: {},
}

function AttractionsReducers(state = initState, action) {
  switch (action.type) {
    case actionTypes.GET_SCENICSPOT_LIST: {
      const { city } = action.payload
      return {
        ...state,
        filterCity: city,
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
