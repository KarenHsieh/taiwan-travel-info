/**
 * @description cookies 登入驗證 check login and role from cookies
 */

const { encryptedToken } = require('../utils/tools')
const { axiosCall } = require('../utils/axios')
const qs = require('qs')
const { CLIENT_ID, CLIENT_SECRET } = require('../staticVar')

module.exports = async ctx => {
  let access_token = ctx.cookies.get('TOKEN') || ''

  // console.log('取 cookie = ' + ctx.cookies.get('TOKEN'))

  const parameter = {
    grant_type: 'client_credentials',
    client_id: CLIENT_ID,
    client_secret: CLIENT_SECRET,
  }

  console.log('====== CLIENT_ID ======')
  console.log(CLIENT_ID)

  if (!access_token) {
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

      console.log('====== TOKEN Response ======')
      console.log(JSON.stringify(data))

      const { access_token: token = '' } = data

      // ctx.cookies.set('TOKEN', encryptedToken(token), {
      // ctx.cookies.set('TOKEN', token, {
      //   secure: false,
      //   httpOnly: false, // true?
      //   maxAge: 21600, // 6hr
      // })

      ctx.cookies.set('TOKEN', token, { maxAge: 21600 }) //6hr

      access_token = token
    } catch (error) {
      console.error(`fetch error - ${JSON.stringify(options)} - ${error.message}`)
    }
  }

  ctx.state.apiToken = access_token
}
