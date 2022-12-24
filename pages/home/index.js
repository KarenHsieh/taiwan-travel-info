import React, { useState, useEffect, useMemo } from 'react'
import { useRouter } from 'next/router'
import { useSelector, useDispatch } from 'react-redux'

// Component
import Carousel from '../../components/Carousel'
import Select from 'react-select'

import { formatDate } from '../../server/utils/tools'
import { axiosCall } from '../../server/utils/axios'
import { FiMapPin, FiChevronRight } from 'react-icons/fi'

import * as AttractionsActions from '../../redux/actions/AttractionsActions'

// Styles And Icons
import styles from './index.module.scss'

const Home = () => {
  // console.log('useRouter.query', useRouter().query)
  const dispatch = useDispatch()
  const { apiToken } = useRouter().query
  // let apiToken = ''

  const { top4Activity: recentActivityListTop4 } = useSelector(state => state.AttractionsReducers)

  const [searchType, setSearchType] = useState('')
  const [searchKeyword, setSearchKeyword] = useState('')
  const [recentActivityList, setRecentActivityList] = useState('')

  useEffect(() => {
    dispatch(AttractionsActions.getRecentActivityListTop4(apiToken))
    // dispatch(AttractionsActions.getRecentActivityList(apiToken))
  }, [])

  const options = [
    { value: 'scenicSpot', label: '探索景點' },
    { value: 'activity', label: '節慶活動' },
    { value: 'restaurant', label: '品嚐美食' },
  ]

  const setType = ({ label, value }) => {
    setSearchType(value)
  }

  const setKeyword = e => {
    const inputText = e.target.value.replace(/[&\|\\\*^%$!?_~#+=(){}@\-`\'\"\/]/g, '').trim()

    setSearchKeyword(inputText)
  }

  const goSearch = () => {
    // dispatch(AttractionsActions.getList({ type: type, city: searchCityCode, keyword: searchKeyword }))
    window.location.href = `/attractions/?type=${searchType}&keyword=${searchKeyword}`
  }

  useMemo(() => {
    let list = []
    if (recentActivityListTop4.length) {
      list = recentActivityListTop4.map(activity => {
        return <ActivityCard key={activity.ID} activity={activity} />
      })
    }
    setRecentActivityList(list)
  }, [recentActivityListTop4])

  return (
    <div>
      <div className={styles.top}>
        <div className={styles.slogan}>
          <div>探索台灣之美</div>
          <div>讓我們更親近這片土地</div>
          <div className={styles.other}>
            <span>台灣旅遊景點導覽</span> Taiwan Travel Guide
          </div>
        </div>
        <div className={styles.search}>
          <div className={styles.selector}>
            <Select options={options} onChange={setType} placeholder={'請選擇分類'} />
          </div>
          <div className={styles.input}>
            <input type="text" placeholder={'輸入關鍵字'} onChange={setKeyword} />
          </div>
          <div>
            <button type="button" onClick={goSearch}>
              搜尋
            </button>
          </div>
        </div>
      </div>

      <Carousel />
      <div className={styles.recentActivity}>
        <div className={styles.title}>
          <div>近期活動</div>
          <div
            onClick={() => {
              window.open('/attractions?type=activity', '_blank')
            }}
          >
            查看更多活動 <FiChevronRight />
          </div>
        </div>
        <div className={styles.row}>{recentActivityList}</div>
      </div>

      <div className={styles.block}>
        <div className={styles.title}>
          <div>熱門打卡景點</div>
          <div
            onClick={() => {
              window.open('/attractions?type=scenicSpot', '_blank')
            }}
          >
            查看更多景點 <FiChevronRight />
          </div>
        </div>
        <div className={styles.row}>
          <ItemCard
            pictureUrl={'/home/ScenicSpotPicture.png'}
            name={'九份老街'}
            city={'新北市'}
            type={'scenicSpot'}
            itemId={'C1_379000000A_000298'}
          />
          <ItemCard
            pictureUrl={'/home/ScenicSpotPicture-1.png'}
            name={'溪頭自然教育園區'}
            city={'南投縣'}
            type={'scenicSpot'}
            itemId={'C1_376480000A_000301'}
          />
          <ItemCard
            pictureUrl={'/home/ScenicSpotPicture-2.png'}
            name={'高美濕地(高美野生動...'}
            city={'台中市'}
            type={'scenicSpot'}
            itemId={'C1_387000000A_000054'}
          />
          <ItemCard
            pictureUrl={'/home/ScenicSpotPicture-3.png'}
            name={'龜山島牛奶海'}
            city={'宜蘭縣'}
            type={'scenicSpot'}
            itemId={'C1_315081800H_010073'}
          />
        </div>
      </div>
      <div className={styles.block}>
        <div className={styles.title}>
          <div>一再回訪美食</div>
          <div
            onClick={() => {
              window.open('/attractions?type=restaurant', '_blank')
            }}
          >
            查看更多美食 <FiChevronRight />
          </div>
        </div>
        <div className={styles.row}>
          <ItemCard
            pictureUrl={'/home/RestaurantPicture.png'}
            name={'金都餐廳'}
            city={'南投縣'}
            type={'restaurant'}
            itemId={'C3_376480000A_000649'}
          />
          <ItemCard
            pictureUrl={'/home/RestaurantPicture-1.png'}
            name={'一中8兩碳烤雞排'}
            city={'台中市'}
            type={'restaurant'}
            itemId={'C3_387000000A_003588'}
          />
          <ItemCard
            pictureUrl={'/home/RestaurantPicture-2.png'}
            name={'名根烤肉食材配送'}
            city={'新北市'}
            type={'restaurant'}
            itemId={'C3_382000000A_206270'}
          />
          <ItemCard
            pictureUrl={'/home/RestaurantPicture-3.png'}
            name={'石桌羊肉店'}
            city={'嘉義縣'}
            type={'restaurant'}
            itemId={'C3_315081300H_000017'}
          />
        </div>
      </div>
    </div>
  )
}

const ActivityCard = ({ activity }) => {
  const { ID, Name, City, StartTime, EndTime, Picture = {} } = activity
  const { PictureUrl1 = '', PictureDescription1 = '' } = Picture

  const start = formatDate(new Date(StartTime))
  const end = formatDate(new Date(EndTime))

  return (
    <div className={styles.activityCard}>
      <div
        className={styles.thumbnail}
        title={PictureDescription1}
        style={{ backgroundImage: `url(${PictureUrl1}),url(${'/images/NoImage-160x160.svg'})` }}
      ></div>

      <div className={styles.content}>
        <div className={styles.date}>
          {start} - {end}
        </div>
        <div className={styles.name}>{Name}</div>
        <div className={styles.location}>
          <div className={styles.city}>
            <FiMapPin />
            {City}
          </div>
          <div className={styles.moreInfo} onClick={() => {}}>
            詳細介紹 <FiChevronRight />
          </div>
        </div>
      </div>
    </div>
  )
}

const ItemCard = props => {
  const { pictureUrl, name, city, type = 'scenicSpot', itemId = '' } = props

  const goDetail = () => {
    window.open(`introduction?type=${type}&ID=${itemId}`)
  }
  return (
    <div className={styles.itemCard} onClick={goDetail}>
      <div
        className={styles.thumbnail}
        style={{ backgroundImage: `url(${pictureUrl}),url(${'/images/NoImage-255x200.svg'})` }}
      ></div>
      <div className={styles.content}>
        <div className={styles.name}>{name}</div>
        <div className={styles.location}>
          <FiMapPin /> {city}
        </div>
      </div>
    </div>
  )
}

export default Home

// export const getServerSideProps = async ctx => {
//   const { apiToken = '' } = ctx.query

//   const { data: recentActivityListTop4 = [] } = await axiosCall(
//     {
//       method: 'GET',
//       url: `https://tdx.transportdata.tw/api/basic/v2/Tourism/Activity?$filter=date(StartTime) ge ${formatDate(
//         new Date()
//       )}&$orderby=StartTime asc&$top=4&$format=JSON`,
//     },
//     apiToken
//   )

//   const { data: recentActivityList = [] } = await axiosCall(
//     {
//       method: 'GET',
//       url: `https://tdx.transportdata.tw/api/basic/v2/Tourism/Activity?$filter=date(StartTime) ge ${formatDate(
//         new Date()
//       )}&$orderby=StartTime asc&$format=JSON`,
//     },
//     apiToken
//   )

//   return {
//     props: { recentActivityListTop4, recentActivityList },
//   }
// }
