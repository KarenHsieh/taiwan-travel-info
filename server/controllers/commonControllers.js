const axios = require('axios')
const { axiosCall, formatDate } = require('../utils/tools')

exports.getToken = async (ctx, next) => {
  ctx.status = 200

  const parameter = {
    grant_type: 'client_credentials',
    client_id: 'mooshi21824-9e46a168-b060-41f7',
    client_secret: 'c8e258be-6f8d-4288-ae6e-327859fd5bbc',
  }

  let auth_url = 'https://tdx.transportdata.tw/auth/realms/TDXConnect/protocol/openid-connect/token'

  const options = {
    method: 'POST',
    headers: { 'X-Requested-With': 'XMLHttpRequest', 'content-type': 'application/json;charset=UTF-8' },
    data: parameter,
    url: auth_url,
  }

  try {
    const response = await axiosCall(options)
    const { data } = response

    ctx.response.body = data
    // if (response) {
    //   const { status, data } = response
    //   if (status === 200) {
    //     ctx.response.body = {
    //       status: 200,
    //       result: data,
    //       dataCount: data.length || 0,
    //     }
    //   } else {
    //     ctx.response.body = {
    //       status: 404,
    //     }
    //   }
    // } else {
    //   ctx.response.body = {
    //     status: 404,
    //   }
    // }
  } catch (error) {
    console.error(`network fetch error - ${options.url} - ${error.message}`)
  }
}
