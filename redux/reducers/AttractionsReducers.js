import * as actionTypes from '../constants'

const initState = {
  resultList: [],
  dataCount: 0,
  isLoading: false,
  fetchDataError: false,
  top4Activity: [],
  allActivity: [],
  serviceError: false,
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
        dataCount: action.payload.dataCount,
        isLoading: false,
        fetchDataError: false,
        serviceError: false,
      }
    }

    case actionTypes.GET_LIST_ERROR: {
      return {
        ...state,
        isLoading: false,
        fetchDataError: true,
      }
    }

    case actionTypes.CLEAR_LIST: {
      return {
        ...state,
        resultList: [],
        dataCount: 0,
      }
    }

    case actionTypes.GET_RECENT_ACTIVITY_LIST_TOP4_SUCCESS: {
      return {
        ...state,
        top4Activity: action.payload,
        serviceError: false,
      }
    }

    case actionTypes.GET_RECENT_ACTIVITY_LIST_SUCCESS: {
      return {
        ...state,
        allActivity: action.payload,
      }
    }

    case actionTypes.SERVICE_ERROR: {
      return {
        ...state,
        serviceError: true,
      }
    }

    default:
      return state
  }
}

export default AttractionsReducers
