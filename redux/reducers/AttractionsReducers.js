import * as actionTypes from '../constants'

const initState = {
  parameters: {},
}

function AttractionsReducers(state = initState, action) {
  switch (action.type) {

    case actionTypes.GET_SCENICSPOT_LIST_SUCCESS: {
      const { prodNo, productName, itemList, source, selectedDate, noCalendarProduct, metaData } = action.payload.data
      return {
        ...state,
        prodNo,
        productName,
        itemList,
        source,
        selectedDate,
        noCalendarProduct,
        metaData,
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