const axios = require('axios')
const { axiosCall, formatDate } = require('../tools')

const apiBaseUri = 'https://ptx.transportdata.tw/MOTC/v2/'
const uri = {
  scenicSpot: `${apiBaseUri}Tourism/ScenicSpot`,
  restaurant: `${apiBaseUri}Tourism/Restaurant`,
  hotel: `${apiBaseUri}Tourism/Hotel`,
  activity: `${apiBaseUri}Tourism/Activity`,
}

// 首頁

exports.getRecentActivityListTop4 = async (ctx, next) => {
  // https://ptx.transportdata.tw/MOTC/v2/Tourism/Activity?$filter=date(StartTime)%20ge%202021-11-10&$orderby=StartTime%20asc&$top=4&$format=JSON
  ctx.status = 200
  const options = {
    method: 'GET',
    url: `${uri.activity}?$filter=date(StartTime) ge ${formatDate(new Date())}&$orderby=StartTime asc&$top=4`,
  }
  console.log(options)
  try {
    const { data } = await axiosCall(options)

    ctx.response.body = {
      status: 200,
      result: data,
    }
  } catch (error) {
    console.error(`network fetch error - ${options.url} - ${error.message}`)
  }
}

exports.getScenicSpotList = async (ctx, next) => {
  ctx.status = 200
  // const { compNo, no, startDate, } = ctx.request.body
  const options = {
    method: 'GET',
    url: uri.scenicSpot,
    // data: {},
  }

  try {
    const { data } = await axiosCall(options)

    ctx.response.body = {
      status: 200,
      result: data.items[0],
    }
  } catch (error) {
    console.error(`network fetch error - ${options.url} - ${error.message}`)
  }
}

exports.getRestaurantList = async (ctx, next) => {
  ctx.status = 200
  const options = {
    method: 'GET',
    url: uri.restaurant,
  }
  try {
    const { data } = await axiosCall(options)

    ctx.response.body = {
      status: 200,
      result: data.items[0],
    }
  } catch (error) {
    console.error(`network fetch error - ${options.url} - ${error.message}`)
  }
}

exports.getHotelList = async (ctx, next) => {
  ctx.status = 200
  const options = {
    method: 'GET',
    url: uri.hotel,
  }
  try {
    const { data } = await axiosCall(options)

    ctx.response.body = {
      status: 200,
      result: data.items[0],
    }
  } catch (error) {
    console.error(`network fetch error - ${options.url} - ${error.message}`)
  }
}

exports.getActivityList = async (ctx, next) => {
  ctx.status = 200
  const options = {
    method: 'GET',
    url: uri.activity,
  }
  try {
    const { data } = await axiosCall(options)

    ctx.response.body = {
      status: 200,
      result: data.items[0],
    }
  } catch (error) {
    console.error(`network fetch error - ${options.url} - ${error.message}`)
  }
}
