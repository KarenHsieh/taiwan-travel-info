import React, { useEffect, useRef, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useRouter } from 'next/router'
import PropTypes from 'prop-types'

import ProductCard from '../../components/ProductCard'
import Breadcrumb from '../../components/Breadcrumb'
import Select from 'react-select'

import * as AttractionsActions from '../../redux/actions/AttractionsActions'

import { getCityListOptions, getCityCode } from '../../utils/cityCode'

import { axiosCall, formatDate } from '../../server/tools'

// Styles And Icons
import styles from './index.module.scss'

const Attractions = () => {
  const router = useRouter()
  const { type } = router.query

  // console.log('type', type)
  const { resultList } = useSelector(state => state.AttractionsReducers)

  const pathname = {
    scenicSpot: '探索景點',
    activity: '節慶活動',
    restaurant: '品嚐美食',
  }

  const breadcrumb = [
    {
      label: '首頁',
      path: '/home',
    },
    {
      label: pathname[type],
      path: `/attractions/${type}`,
    },
  ]

  return (
    <div>
      <Breadcrumb items={breadcrumb} />
      <SearchBar type={type} />
      {resultList && Object.keys(resultList).length ? <List /> : <CategorySection type={type} />}

      <List />
    </div>
  )
}

const CategorySection = ({ type }) => {
  return (
    <>
      {type === 'scenicSpot' ? (
        <>
          <h3>熱門分類</h3>
          <div className={styles.topic}>
            <TopicCategory pictureUrl={'/images/scenicSpot1.png'} name={'自然風景類'} />
            <TopicCategory pictureUrl={'/images/scenicSpot2.png'} name={'觀光工廠類'} />
            <TopicCategory pictureUrl={'/images/scenicSpot3.png'} name={'休閒農業類'} />
            <TopicCategory pictureUrl={'/images/scenicSpot4.png'} name={'生態類'} />
            <TopicCategory pictureUrl={'/images/scenicSpot5.png'} name={'溫泉類'} />
            <TopicCategory pictureUrl={'/images/scenicSpot6.png'} name={'自然風景類'} />
            <TopicCategory pictureUrl={'/images/scenicSpot7.png'} name={'古蹟類'} />
          </div>
        </>
      ) : null}

      {type === 'activity' ? (
        <>
          <h3>熱門分類</h3>
          <div className={styles.topic}>
            <TopicCategory pictureUrl={'/images/activity1.png'} name={'節慶活動'} />
            <TopicCategory pictureUrl={'/images/activity2.png'} name={'自行車活動'} />
            <TopicCategory pictureUrl={'/images/activity3.png'} name={'遊憩活動'} />
            <TopicCategory pictureUrl={'/images/activity4.png'} name={'產業文化活動'} />
            <TopicCategory pictureUrl={'/images/activity5.png'} name={'年度活動'} />
            <TopicCategory pictureUrl={'/images/activity6.png'} name={'四季活動'} />
          </div>
        </>
      ) : null}
      {type === 'restaurant' ? (
        <>
          <h3>熱門分類</h3>
          <div className={styles.topic}>
            <TopicCategory pictureUrl={'/images/food1.png'} name={'地方特產'} />
            <TopicCategory pictureUrl={'/images/food2.png'} name={'中式美食'} />
            <TopicCategory pictureUrl={'/images/food3.png'} name={'甜點冰品'} />
            <TopicCategory pictureUrl={'/images/food4.png'} name={'異國料理'} />
            <TopicCategory pictureUrl={'/images/food5.png'} name={'伴手禮'} />
            <TopicCategory pictureUrl={'/images/food6.png'} name={'素食'} />
          </div>
        </>
      ) : null}
    </>
  )
}

const SearchBar = ({ type }) => {
  const dispatch = useDispatch()

  const [searchCityCode, setSearchCityCode] = useState('')
  const [searchCityName, setSearchCityName] = useState('')
  const [searchKeyword, setSearchKeyword] = useState('')

  let inputPlaceholder = '請輸入關鍵字'

  switch (type) {
    case 'scenicSpot': {
      inputPlaceholder = '你想去哪裡？請輸入關鍵字'
      break
    }
    case 'activity': {
      inputPlaceholder = '想找有趣的？請輸入關鍵字'
      break
    }
    case 'restaurant': {
      inputPlaceholder = '你想吃什麼？請輸入關鍵字'
      break
    }
    default: {
      inputPlaceholder = '請輸入關鍵字'
    }
  }

  const setCity = ({ label, value }) => {
    console.log(value)
    setSearchCityCode(value)
    setSearchCityName(label)
  }

  const setKeyword = e => {
    const inputText = e.target.value.replace(/[&\|\\\*^%$!?_~#+=(){}@\-`\'\"\/]/g, '').trim()
    console.log(inputText)
    setSearchKeyword(inputText)
  }

  const getList = () => {
    dispatch(AttractionsActions.getList({ type: type, city: searchCityCode, keyword: searchKeyword }))
  }

  return (
    <div>
      <div className={styles.searchBar}>
        <Select options={getCityListOptions()} placeholder={'全部縣市'} width="200px" onChange={setCity} />

        <div>
          <input className={styles.searchInput} type="text" placeholder={inputPlaceholder} onChange={setKeyword} />
        </div>
        <div>
          <button className={styles.searchButton} type="button" onClick={getList}>
            搜尋
          </button>
        </div>
      </div>
    </div>
  )
}

const TopicCategory = ({ pictureUrl, name }) => {
  return (
    <div className={styles.topicCategory} style={{ backgroundImage: `url(${pictureUrl})` }}>
      {name}
    </div>
  )
}

const List = () => {
  const { resultList = [] } = useSelector(state => state.AttractionsReducers)

  const list = resultList.map(item => {
    return <ProductCard key={item.ID} item={item} />
  })

  return <div className={styles.list}>{list}</div>
}

export default Attractions

export async function getStaticPaths() {
  return { paths: ['/attractions/scenicSpot', '/attractions/activity', '/attractions/restaurant'], fallback: true }
}

export const getStaticProps = async ctx => {
  const { data: scenicSpotTopicColumns } = await axiosCall({
    method: 'GET',
    url: `https://ptx.transportdata.tw/MOTC/v2/Tourism/ScenicSpot?$select=Class1&$filter=not(Class1%20eq%20null)&$top=150&$format=JSON`,
  })

  const scenicSpotTopicsArray = scenicSpotTopicColumns.map(topic => {
    return topic.Class1
  })

  const scenicSpotTopics = [...new Set(scenicSpotTopicsArray)]

  return {
    props: { scenicSpotTopics },
  }
}
