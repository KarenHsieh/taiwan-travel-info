const ptx = require('../staticVar')
var CryptoJS = require('crypto-js')

exports.formatDate = date => {
  var d = new Date(date),
    month = '' + (d.getMonth() + 1),
    day = '' + d.getDate(),
    year = d.getFullYear()

  if (month.length < 2) month = '0' + month
  if (day.length < 2) day = '0' + day

  return [year, month, day].join('-')
}

exports.encryptedToken = token => {
  // Generate a random key
  // var key = CryptoJS.lib.WordArray.random(256 / 8)

  // Encrypt the API token
  var encrypted = CryptoJS.AES.encrypt(token, ptx.ENCODE_KEY)
  console.log(token + ' => encrypted = ' + encrypted)

  return encrypted
}

exports.decryptedToken = token => {
  // 解密
  var decrypted = CryptoJS.AES.decrypt(token, ptx.ENCODE_KEY)
  console.log(token + ' => decrypted = ' + decrypted)

  return decrypted
}
