import React, { useEffect, useRef, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import PropTypes from 'prop-types'

import * as AttractionsActions from '../../redux/actions/AttractionsActions'

// Component
import Carousel from '../../components/Carousel'
import Select from 'react-select'

import { axiosCall, formatDate } from '../../server/tools'

// Styles And Icons
import styles from './index.module.scss'
import { ReactComponent as ArrowRight } from '/public/icons/arrow-right16_G.svg'

const Home = ({ recentActivityListTop4 }) => {
  const options = [
    { value: 'scenicSpot', label: '探索景點' },
    { value: 'activity', label: '節慶活動' },
    { value: 'food', label: '品嚐美食' },
  ]
  return (
    <div>
      <div className={styles.topic}>
        <div className={styles.slogan}>
          <div>探索台灣之美</div>
          <div>讓我們更親近這片土地</div>
          <div>台灣旅遊景點導覽 Taiwan Travel Guide</div>
        </div>
        <div className={styles.search}>
          <div>
            <Select options={options} />
          </div>
          <div>
            <input type="text" placeholder={'輸入景點關鍵字'} />
          </div>
          <div>
            <button type="button">搜尋</button>
          </div>
        </div>
      </div>

      <Carousel />
      <div className={styles.recentActivity}>
        <div className={styles.title}>
          <div>近期活動</div>
          <div>查看更多活動</div>
        </div>
        <div className={styles.row}>
          {recentActivityListTop4.map(activity => {
            return <ActivityCard key={activity.ID} activity={activity} />
          })}
        </div>
      </div>

      <div className={styles.block}>
        <div className={styles.title}>
          <div>熱門打卡景點</div>
          <div>查看更多景點</div>
        </div>
        <div className={styles.row}>
          <ItemCard pictureUrl={'/home/ScenicSpotPicture.png'} name={'龜山島牛奶海'} city={'宜蘭縣'} />
          <ItemCard pictureUrl={'/home/ScenicSpotPicture-1.png'} name={'高美濕地(高美野生動...'} city={'台中市'} />
          <ItemCard pictureUrl={'/home/ScenicSpotPicture-2.png'} name={'溪頭自然教育園區'} city={'南投縣'} />
          <ItemCard pictureUrl={'/home/ScenicSpotPicture-3.png'} name={'九份老街'} city={'新北市'} />
        </div>
      </div>
      <div className={styles.block}>
        <div className={styles.title}>
          <div>一再回訪美食</div>
          <div>查看更多美食</div>
        </div>
        <div className={styles.row}>
          <ItemCard pictureUrl={'/home/RestaurantPicture.png'} name={'金都餐廳'} city={'南投縣'} />
          <ItemCard pictureUrl={'/home/RestaurantPicture-1.png'} name={'一中8兩碳烤雞排'} city={'台中市'} />
          <ItemCard pictureUrl={'/home/RestaurantPicture-2.png'} name={'名根烤肉食材配送'} city={'新北市'} />
          <ItemCard pictureUrl={'/home/RestaurantPicture-3.png'} name={'石桌羊肉店'} city={'嘉義縣'} />
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
          <div className={styles.city}>{City}</div>
          <div className={styles.moreInfo} onClick={() => {}}>
            詳細介紹
          </div>
        </div>
      </div>
    </div>
  )
}

const ItemCard = props => {
  const { pictureUrl, name, city } = props
  return (
    <div className={styles.itemCard}>
      <div
        className={styles.thumbnail}
        style={{ backgroundImage: `url(${pictureUrl}),url(${'/images/NoImage-255x200.svg'})` }}
      ></div>
      <div className={styles.content}>
        <div className={styles.name}>{name}</div>
        <div className={styles.location}>{city}</div>
      </div>
    </div>
  )
}

export default Home

export const getStaticProps = async ctx => {
  const { data: recentActivityListTop4 } = await axiosCall({
    method: 'GET',
    url: `https://ptx.transportdata.tw/MOTC/v2/Tourism/Activity?$filter=date(StartTime) ge ${formatDate(
      new Date()
    )}&$orderby=StartTime asc&$top=4&$format=JSON`,
  })

  const { data: recentActivityList } = await axiosCall({
    method: 'GET',
    url: `https://ptx.transportdata.tw/MOTC/v2/Tourism/Activity?$filter=date(StartTime) ge ${formatDate(
      new Date()
    )}&$orderby=StartTime asc&$format=JSON`,
  })

  return {
    props: { recentActivityListTop4, recentActivityList },
  }
}
