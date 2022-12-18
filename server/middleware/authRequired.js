/**
 * @description cookies 登入驗證 check login and role from cookies
 */

const { encryptedToken } = require('../utils/tools')
const { axiosCall } = require('../utils/axios')
const qs = require('qs')
const ptx = require('../staticVar')

module.exports = async ctx => {
  const token = ctx.cookies.get('TOKEN') ? ctx.cookies.get('TOKEN').replace(/"/g, '') : ''

  const parameter = {
    grant_type: 'client_credentials',
    client_id: ptx.CLIENT_ID,
    client_secret: ptx.CLIENT_SECRET,
  }

  // console.log('==============parameter===============')
  // console.log(JSON.stringify(parameter))

  let access_token = {}

  if (!token) {
    const options = {
      method: 'POST',
      url: 'https://tdx.transportdata.tw/auth/realms/TDXConnect/protocol/openid-connect/token',
      data: qs.stringify(parameter),
      responseType: 'json',
      withCredentials: true,
      headers: { 'content-type': 'application/x-www-form-urlencoded' },
    }

    // console.log('====== options ======')
    // console.log(JSON.stringify(options))

    try {
      const { status, data } = await axiosCall(options)

      // console.log('====== Response ======')
      // console.log(status)
      // console.log(JSON.stringify(data))

      const { access_token: token = '' } = data

      // ctx.cookies.set('TOKEN', encryptedToken(token), {
      ctx.cookies.set('TOKEN', token, {
        secure: false,
        httpOnly: true,
        maxAge: 21600, // 6hr
      })

      access_token = token
    } catch (error) {
      console.error(`fetch error - ${JSON.stringify(options)} - ${error.message}`)
    }
    ctx.state.token = access_token
  } else {
    ctx.state.token = token
  }
}
