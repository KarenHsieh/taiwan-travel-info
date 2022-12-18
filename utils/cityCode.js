const cityMappingTable = {
  '臺北市': 'Taipei',
  '新北市': 'NewTaipei',
  '桃園市': 'Taoyuan',
  '臺中市': 'Taichung',
  '臺南市': 'Tainan',
  '高雄市': 'Kaohsiung',
  '基隆市': 'Keelung',
  '新竹市': 'Hsinchu',
  '新竹縣': 'HsinchuCounty',
  '苗栗縣': 'MiaoliCounty',
  '彰化縣': 'ChanghuaCounty',
  '南投縣': 'NantouCounty',
  '雲林縣': 'YunlinCounty',
  '嘉義縣': 'ChiayiCounty',
  '嘉義市': 'Chiayi',
  '屏東縣': 'PingtungCounty',
  '宜蘭縣': 'YilanCounty',
  '花蓮縣': 'HualienCounty',
  '臺東縣': 'TaitungCounty',
  '金門縣': 'KinmenCounty',
  '澎湖縣': 'PenghuCounty',
  '連江縣': 'LienchiangCounty',
}

export const getCityListOptions = () => {
  const cityListOptions = Object.keys(cityMappingTable).map(name => {
    const cityCode = cityMappingTable[name]

    return { value: cityCode, label: name }
  })

  return cityListOptions
}

export const getCityListOptionIndex = code => {
  const res = Object.keys(cityMappingTable).filter((cityName, index) => {
    if (cityMappingTable[cityName] === code) return index
  })

  return res[0]
}

export const getCityCode = chineseName => {
  return cityMappingTable[chineseName]
}

export const getCityName = code => {
  const res = Object.keys(cityMappingTable).filter(cityName => {
    return cityMappingTable[cityName] === code
  })

  return res[0]
}
