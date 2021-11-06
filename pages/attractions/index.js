import React, { useEffect, useRef, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import PropTypes from 'prop-types'

import ProductCard from '../../components/ProductCard'

import * as AttractionsActions from '../../redux/actions/AttractionsActions'

// Styles And Icons
import styles from './index.module.scss'

const Attractions = () => {
  return (
    <div>
      <SearchBar />
      <List />
    </div>
  )
}

export default Attractions

const SearchBar = () => {
  const dispatch = useDispatch()
  const { scenicspotList } = useSelector(state => state.AttractionsReducers)

  const [citySelectorOpen, setCitySelectorOpen] = useState(false)

  const handleClick = () => {
    // setCitySelectorOpen(!citySelectorOpen)

    dispatch(AttractionsActions.getScenicspotList({ city: 'Taipei' }))
  }
  const filterScenicSpot = () => {
    // dispatch(AttractionsActions.getScenicspotList())
  }

  return (
    <div>
      <div className={styles.searchBar}>
        <div className={`${styles.cityPopover} ${citySelectorOpen ? styles.open : ''}`}>
          <div className={styles.container}>
            <div>台北市</div>
            <div>基隆市</div>
          </div>
        </div>
        <input className={styles.citySelector} type="text" placeholder="輸入地區" onClick={handleClick} />
        <input className={styles.searchInput} type="text" placeholder="輸入關鍵字" />
        <button className={styles.searchButton} type="button">
          搜尋
        </button>
      </div>
      <div className={styles.filterOptions}>
        <button className={styles.filterButton} type="button" onClick={filterScenicSpot}>
          景點
        </button>
        <button className={styles.filterButton} type="button">
          餐飲
        </button>
        <button className={styles.filterButton} type="button">
          旅宿
        </button>
        <button className={styles.filterButton} type="button">
          活動
        </button>
      </div>
    </div>
  )
}

const List = () => {
  const items = [
    {
      'ID': 'C1_315080500H_000068',
      'Name': '紫坪',
      'DescriptionDetail':
        '紫坪位在綠島最南方，緊鄰「綠島露營區」。從露營區旁的步道，可通往海岸邊的潟湖「紫坪」。「紫坪」是一處由珊瑚礁構成的潮池，也是綠島著名的潟湖所在地，有全綠島最完整的潟湖地形以及珊瑚礁植群，更有茂盛的植物水芫花和珍貴的陸寄居蟹。外海儘管浪濤洶湧，內湖依然波平如鏡，宛若沉睡的湖水，清淺的躺在外珊瑚礁岩與內珊瑚貝砂灘間；水芫花灌叢身影倒映於平靜無波的水面上，潔白柔細的白砂鋪陳水底。熱帶海岸旖旎風情，盡在不言中。',
      'Description':
        '紫坪位在綠島最南方，從附近的步道，可通往海岸邊的潟湖。此處是由珊瑚礁構成的潮池，也是綠島著名的潟湖所在地，有全綠島最完整的潟湖地形以及珊瑚礁植群，更有茂盛的植物水芫花和珍貴的陸寄居蟹。',
      'Phone': '886-8-9672026',
      'Address': '臺東縣951綠島鄉溫泉路256號',
      'ZipCode': '951',
      'TravelInfo':
        '南下：於花蓮火車站前搭乘花蓮客運，往豐濱、靜浦，或是台東方向班車，在富岡漁港站下車後步行至富岡漁港，轉乘渡船前往綠島。北上：自台東火車站前搭乘台灣好行東部海岸線或鼎東客運海線班車，在富岡漁港站下車後步行至富岡漁港，轉乘渡船前往綠島。綠島：島上設有環島公車，搭乘公車至朝日溫泉下車，往前步行約5分鐘(查詢電話：089-672510)。。',
      'OpenTime': '全天候開放',
      'Picture': {
        'PictureUrl1': 'https://www.eastcoast-nsa.gov.tw/image/419/640x480',
        'PictureDescription1': '從步道上遙望綠島露營區海邊',
      },
      'Position': {
        'PositionLon': 121.49990844726562,
        'PositionLat': 22.633939743041992,
        'GeoHash': 'wsn2ub3s3',
      },
      'ParkingPosition': {},
      'TicketInfo': '免費，露營活動另計。',
      'Remarks':
        '1、紫坪上方的綠島露營區為生態保護區，禁止採集花木生物，並請維護環境整潔，讓這片美景能留與後代子孫。2、露營區目前已於2009年委由「東方之泉有限股份公司」經營，      聯絡電...',
      'SrcUpdateTime': '2021-11-06T01:11:53+08:00',
      'UpdateTime': '2021-11-06T02:10:14+08:00',
    },
    {
      'ID': 'C1_379000000A_000003',
      'Name': '大佳碼頭',
      'DescriptionDetail':
        '大佳碼頭位於圓山基隆河左岸，圓山昔稱圓仔山，是大龍峒地形上的龍頭之地，由於基隆河流經，過去曾是海水進出的湖沼地區，經過開挖發掘的圓山遺址及貝塚，證明當時先民生活的位址。緊依著圓山的劍潭之地，因國姓爺鄭成功插劍水潭取水而得名，日據時期日人曾於今圓山飯店旁忠烈祠西側之地，興建臺灣神社及神宮外苑花園，由此可見其地理位置之重要性。大佳碼頭位於基隆河南岸、大直橋以西約200公尺的地方。這裡是「藍色水路」的遊艇碼頭，從這裡有大佳到圓山、大佳到內湖科學園區單點來回兩個航線。',
      'Phone': '886-2-29284665',
      'ZipCode': '104',
      'OpenTime': '開放空間',
      'Picture': {
        'PictureUrl1': 'https://www.travel.taipei/image/63327',
        'PictureDescription1': '大佳碼頭',
      },
      'Position': {
        'PositionLon': 121.53742218017578,
        'PositionLat': 25.07588005065918,
        'GeoHash': 'wsqqtsuve',
      },
      'Class1': '遊憩類',
      'Class2': '都會公園類',
      'Level': '非古蹟',
      'WebsiteUrl': 'https://www.riverfun.net/wharf',
      'ParkingPosition': {},
      'City': '臺北市',
      'SrcUpdateTime': '2021-11-06T01:11:53+08:00',
      'UpdateTime': '2021-11-06T02:10:14+08:00',
    },
  ]
  const list = items.map(item => {
    return <ProductCard key={item.ID} item={item} />
  })

  return <div className={styles.list}>{list}</div>
}
