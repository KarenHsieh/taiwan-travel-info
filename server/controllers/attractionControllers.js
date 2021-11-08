const axios = require('axios')
const { axiosCall } = require('../tools')

const apiBaseUri = 'https://ptx.transportdata.tw/MOTC/v2/'
const uri = {
  scenicSpot: `${apiBaseUri}Tourism/ScenicSpot`,
  restaurant: `${apiBaseUri}Tourism/Restaurant`,
  hotel: `${apiBaseUri}Tourism/Hotel`,
  activity: `${apiBaseUri}Tourism/Activity`,
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
