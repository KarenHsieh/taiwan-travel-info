const axios = require('axios')
const { decryptedToken } = require('./tools')

axios.interceptors.request.use(
  config => {
    return config
  },
  error => {
    return Promise.reject(error)
  }
)
axios.interceptors.response.use(
  response => {
    return response
  },
  error => {
    return Promise.resolve(error.response)
  }
)

// old ptx api header
// const getAuthorizationHeader = function () {
//   var AppID = ptx.AppID
//   var AppKey = ptx.AppKey

//   var GMTString = new Date().toGMTString()
//   var ShaObj = new jsSHA('SHA-1', 'TEXT')
//   ShaObj.setHMACKey(AppKey, 'TEXT')
//   ShaObj.update('x-date: ' + GMTString)
//   var HMAC = ShaObj.getHMAC('B64')
//   var Authorization = 'hmac username="' + AppID + '", algorithm="hmac-sha1", headers="x-date", signature="' + HMAC + '"'

//   return {
//     'Authorization': Authorization,
//     'X-Date': GMTString,
//     'Accept-Encoding': 'gzip',
//   }
// }

exports.axiosCall = (options, token = '') => {
  const method = options.method.toLocaleLowerCase()

  let headers = ''
  if (true) {
    // headers = { 'authorization': 'Bearer ' + decryptedToken(token) }
    headers = { 'authorization': 'Bearer ' + token }
  }

  console.log('=====> axiosCall')
  console.log({
    method: 'POST',
    url: options.url,
    timeout: 30 * 1000,
    data: options.data || {},
    maxContentLength: options.maxContentLength || 10 * 1024 * 1024,
    maxBodyLength: options.maxBodyLength || 10 * 1024 * 1024,
    // headers: getAuthorizationHeader(), // old ptx api header
    headers: headers || {
      'X-Requested-With': 'XMLHttpRequest',
      'Content-Type': 'application/json;charset=UTF-8',
    },
    responseType: options.responseType || 'json',
    withCredentials: options.withCredentials || false,
  })

  switch (method) {
    case 'post':
      return axios({
        method: 'POST',
        url: options.url,
        timeout: 30 * 1000,
        data: options.data || {},
        maxContentLength: options.maxContentLength || 10 * 1024 * 1024,
        maxBodyLength: options.maxBodyLength || 10 * 1024 * 1024,
        // headers: getAuthorizationHeader(), // old ptx api header
        headers: headers || {
          'X-Requested-With': 'XMLHttpRequest',
          'Content-Type': 'application/json;charset=UTF-8',
        },
        responseType: options.responseType || 'json',
        withCredentials: options.withCredentials || false,
      }).then(response => {
        return response
      })

    case 'get':
    default:
      return axios({
        method: 'GET',
        url: options.url,
        timeout: 30 * 1000,
        // headers: getAuthorizationHeader(),
        headers: headers || {
          'X-Requested-With': 'XMLHttpRequest',
          'Content-Type': 'application/json;charset=UTF-8',
        },
      }).then(response => {
        // if(response.status === 200) {}
        return response
      })
  }
}
