import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useRouter } from 'next/router'
import PropTypes from 'prop-types'

import ProductCard from '../../components/ProductCard'
import Breadcrumb from '../../components/Breadcrumb'
import Select from 'react-select'
import ReactPaginate from 'react-paginate'

import * as AttractionsActions from '../../redux/actions/AttractionsActions'

import { getCityListOptions, getCityCode } from '../../utils/cityCode'

import { axiosCall, formatDate } from '../../server/tools'

// Styles And Icons
import styles from './index.module.scss'

const Attractions = () => {
  const dispatch = useDispatch()
  const router = useRouter()
  const { type, keyword: keywordQuery = '' } = router.query

  const { resultList, dataCount, isLoading, fetchDataError } = useSelector(state => state.AttractionsReducers)

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

  useEffect(() => {
    dispatch(AttractionsActions.clearList())
  }, [type])

  return (
    <div>
      <Breadcrumb items={breadcrumb} />
      <SearchBar type={type} keywordQuery={keywordQuery} />
      {resultList && dataCount ? (
        <List type={type} />
      ) : !fetchDataError ? (
        <CategorySection type={type} />
      ) : (
        <div className={styles.errorResult}>
          <div>
            <div>
              <img src="/icons/nofound80.svg" alt="查無資料" />
            </div>
            <div>
              <p>目前查無資料</p>
              <p>請重新搜尋</p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

const CategorySection = ({ type }) => {
  return (
    <>
      {type === 'scenicSpot' ? (
        <>
          <h3 className={styles.category}>熱門分類</h3>
          <div className={styles.topic}>
            <TopicCategory pictureUrl={'/images/scenicSpot1.png'} name={'自然風景類'} type={type} />
            <TopicCategory pictureUrl={'/images/scenicSpot2.png'} name={'觀光工廠類'} type={type} />
            <TopicCategory pictureUrl={'/images/scenicSpot3.png'} name={'休閒農業類'} type={type} />
            <TopicCategory pictureUrl={'/images/scenicSpot4.png'} name={'生態類'} type={type} />
            <TopicCategory pictureUrl={'/images/scenicSpot5.png'} name={'溫泉類'} type={type} />
            <TopicCategory pictureUrl={'/images/scenicSpot6.png'} name={'自然風景類'} type={type} />
            <TopicCategory pictureUrl={'/images/scenicSpot7.png'} name={'古蹟類'} type={type} />
          </div>
        </>
      ) : null}

      {type === 'activity' ? (
        <>
          <h3 className={styles.category}>熱門分類</h3>
          <div className={styles.topic}>
            <TopicCategory pictureUrl={'/images/activity1.png'} name={'節慶活動'} type={type} />
            <TopicCategory pictureUrl={'/images/activity2.png'} name={'自行車活動'} type={type} />
            <TopicCategory pictureUrl={'/images/activity3.png'} name={'遊憩活動'} type={type} />
            <TopicCategory pictureUrl={'/images/activity4.png'} name={'產業文化活動'} type={type} />
            <TopicCategory pictureUrl={'/images/activity5.png'} name={'年度活動'} type={type} />
            <TopicCategory pictureUrl={'/images/activity6.png'} name={'四季活動'} type={type} />
          </div>
        </>
      ) : null}
      {type === 'restaurant' ? (
        <>
          <h3 className={styles.category}>熱門分類</h3>
          <div className={styles.topic}>
            <TopicCategory pictureUrl={'/images/food1.png'} name={'地方特產'} type={type} />
            <TopicCategory pictureUrl={'/images/food2.png'} name={'中式美食'} type={type} />
            <TopicCategory pictureUrl={'/images/food3.png'} name={'甜點冰品'} type={type} />
            <TopicCategory pictureUrl={'/images/food4.png'} name={'異國料理'} type={type} />
            <TopicCategory pictureUrl={'/images/food5.png'} name={'伴手禮'} type={type} />
            <TopicCategory pictureUrl={'/images/food6.png'} name={'素食'} type={type} />
          </div>
        </>
      ) : null}
    </>
  )
}

const SearchBar = ({ type, keywordQuery }) => {
  const { isLoading } = useSelector(state => state.AttractionsReducers)
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
    setSearchCityCode(value)
    setSearchCityName(label)
  }

  const setKeyword = e => {
    const inputText = e.target.value.replace(/[&\|\\\*^%$!?_~#+=(){}@\-`\'\"\/]/g, '').trim()

    setSearchKeyword(inputText)
  }

  const getList = () => {
    dispatch(AttractionsActions.getList({ type: type, city: searchCityCode, keyword: searchKeyword }))
  }

  let buttonStyle = {}
  if (isLoading) {
    buttonStyle = {
      backgroundColor: '#b5c9b2',
      cursor: 'not-allowed',
    }
  }

  return (
    <div>
      <div className={styles.searchBar}>
        <div className={styles.selector}>
          <Select options={getCityListOptions()} placeholder={'全部縣市'} height={'100%'} onChange={setCity} />
        </div>

        <div>
          <input
            className={styles.searchInput}
            type="text"
            placeholder={inputPlaceholder}
            onChange={setKeyword}
            defaultValue={keywordQuery}
          />
        </div>
        <div>
          <button
            className={styles.searchButton}
            type="button"
            onClick={getList}
            style={buttonStyle}
            disabled={isLoading}
          >
            搜尋
          </button>
        </div>
      </div>
    </div>
  )
}

const TopicCategory = ({ pictureUrl, name, type }) => {
  const dispatch = useDispatch()
  const getList = () => {
    dispatch(AttractionsActions.getList({ type: type, city: '', keyword: '', class: name }))
  }

  return (
    <div className={styles.topicCategory} style={{ backgroundImage: `url(${pictureUrl})` }} onClick={getList}>
      {name}
    </div>
  )
}

const List = ({ type }) => {
  const itemsPerPage = 20
  const [currentItems, setCurrentItems] = useState(null)
  const [pageCount, setPageCount] = useState(0)

  const [itemOffset, setItemOffset] = useState(0)

  const { resultList = [], dataCount } = useSelector(state => state.AttractionsReducers)

  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage
    setCurrentItems(resultList.slice(itemOffset, endOffset))
    setPageCount(Math.ceil(dataCount / itemsPerPage))
  }, [dataCount, itemOffset, resultList])

  const handlePageClick = event => {
    const newOffset = (event.selected * itemsPerPage) % dataCount
    setItemOffset(newOffset)
  }

  return (
    <>
      <div className={styles.list}>
        <PaginateItems currentItems={currentItems} type={type} />
      </div>

      <div class="pagination">
        <ReactPaginate
          breakLabel="..."
          nextLabel=">"
          onPageChange={handlePageClick}
          pageRangeDisplayed={5}
          pageCount={pageCount}
          previousLabel="<"
          renderOnZeroPageCount={null}
        />
      </div>
    </>
  )
}

function PaginateItems({ currentItems, type = '' }) {
  return <>{currentItems && currentItems.map(item => <ProductCard key={item.ID} item={item} type={type} />)}</>
}

export default Attractions

// export async function getStaticPaths() {
//   return { paths: ['/attractions/scenicSpot', '/attractions/activity', '/attractions/restaurant'], fallback: true }
// }

// export const getStaticProps = async ctx => {
//   const { data: scenicSpotTopicColumns } = await axiosCall({
//     method: 'GET',
//     url: `https://ptx.transportdata.tw/MOTC/v2/Tourism/ScenicSpot?$select=Class1&$filter=not(Class1%20eq%20null)&$top=150&$format=JSON`,
//   })

//   const scenicSpotTopicsArray = scenicSpotTopicColumns.map(topic => {
//     return topic.Class1
//   })

//   const scenicSpotTopics = [...new Set(scenicSpotTopicsArray)]

//   return {
//     props: { scenicSpotTopics },
//   }
// }
