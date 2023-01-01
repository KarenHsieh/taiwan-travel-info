import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useRouter } from 'next/router'

import ProductCard from '../../components/ProductCard'
import Breadcrumb from '../../components/Breadcrumb'
import Select from 'react-select'
import ReactPaginate from 'react-paginate'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

import * as AttractionsActions from '../../redux/actions/AttractionsActions'

import { getCityListOptions, getCityName } from '../../utils/cityCode'

import { confirmAlert } from 'react-confirm-alert'
import 'react-confirm-alert/src/react-confirm-alert.css'

// Styles And Icons
import styles from './index.module.scss'

const Attractions = () => {
  const dispatch = useDispatch()
  const { type, keyword: keywordQuery = '', city: cityQuery = '', apiToken } = useRouter().query
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
      path: `/attractions?type=${type}`,
    },
  ]

  useEffect(() => {
    dispatch(AttractionsActions.clearList())
    if (cityQuery || keywordQuery) {
      dispatch(AttractionsActions.getList({ type: type, city: cityQuery, keyword: keywordQuery, token: apiToken }))
    }
  }, [type, keywordQuery, cityQuery, apiToken])

  return (
    <div>
      <Breadcrumb items={breadcrumb} />
      <SearchBar type={type} keywordQuery={keywordQuery} cityQuery={cityQuery} />
      {resultList && dataCount > 0 && !fetchDataError ? <List key={type} type={type} /> : null}

      {fetchDataError && (
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

      <CategorySection type={type} token={apiToken} />
    </div>
  )
}

const CategorySection = props => {
  const { type } = props
  return (
    <>
      {type === 'scenicSpot' ? (
        <>
          <h3 className={styles.category}>熱門分類</h3>

          <div className={styles.topic}>
            <>
              <TopicCategory pictureUrl={'/images/scenicSpot1.png'} name={'自然風景類'} {...props} />
              <TopicCategory pictureUrl={'/images/scenicSpot2.png'} name={'觀光工廠類'} {...props} />
              <TopicCategory pictureUrl={'/images/scenicSpot3.png'} name={'休閒農業類'} {...props} />
              <TopicCategory pictureUrl={'/images/scenicSpot4.png'} name={'生態類'} {...props} />
              <TopicCategory pictureUrl={'/images/scenicSpot5.png'} name={'溫泉類'} {...props} />
              <TopicCategory pictureUrl={'/images/scenicSpot6.png'} name={'自然風景類'} {...props} />
              <TopicCategory pictureUrl={'/images/scenicSpot7.png'} name={'古蹟類'} {...props} />
            </>
          </div>
        </>
      ) : null}

      {type === 'activity' ? (
        <>
          <h3 className={styles.category}>熱門分類</h3>
          <div className={styles.topic}>
            <TopicCategory pictureUrl={'/images/activity1.png'} name={'節慶活動'} {...props} />
            <TopicCategory pictureUrl={'/images/activity2.png'} name={'自行車活動'} {...props} />
            <TopicCategory pictureUrl={'/images/activity3.png'} name={'遊憩活動'} {...props} />
            <TopicCategory pictureUrl={'/images/activity4.png'} name={'產業文化活動'} {...props} />
            <TopicCategory pictureUrl={'/images/activity5.png'} name={'年度活動'} {...props} />
            <TopicCategory pictureUrl={'/images/activity6.png'} name={'四季活動'} {...props} />
          </div>
        </>
      ) : null}
      {type === 'restaurant' ? (
        <>
          <h3 className={styles.category}>熱門分類</h3>
          <div className={styles.topic}>
            <TopicCategory pictureUrl={'/images/food1.png'} name={'地方特產'} {...props} />
            <TopicCategory pictureUrl={'/images/food2.png'} name={'中式美食'} {...props} />
            <TopicCategory pictureUrl={'/images/food3.png'} name={'甜點冰品'} {...props} />
            <TopicCategory pictureUrl={'/images/food4.png'} name={'異國料理'} {...props} />
            <TopicCategory pictureUrl={'/images/food5.png'} name={'伴手禮'} {...props} />
            <TopicCategory pictureUrl={'/images/food6.png'} name={'素食'} {...props} />
          </div>
        </>
      ) : null}
    </>
  )
}

const SearchBar = ({ type, keywordQuery, cityQuery }) => {
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
    console.log(label)
    console.log(value)
    setSearchCityCode(value)
    setSearchCityName(label)
  }

  const setKeyword = e => {
    const inputText = e.target.value.replace(/[&\|\\\*^%$!?_~#+=(){}@\-`\'\"\/]/g, '').trim()

    setSearchKeyword(inputText)
  }

  let queryString = ''

  const getList = () => {
    queryString += `?type=${type}&${searchCityCode ? `city=${searchCityCode}` : ''}${
      searchKeyword ? `&keyword=${searchKeyword}` : ''
    }`
    window.location.href = `/attractions${encodeURI(queryString)}`
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
          <Select
            options={getCityListOptions()}
            placeholder={'選擇縣市'}
            height={'100%'}
            onChange={setCity}
            defaultValue={{ label: getCityName(cityQuery), value: cityQuery }} //getCityListOptionIndex(cityQuery)
            // value={{ label: searchCityName, value: searchCityCode }}
          />
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

const TopicCategory = ({ pictureUrl, name, type, token }) => {
  const dispatch = useDispatch()
  const getList = () => {
    dispatch(AttractionsActions.getList({ type: type, city: '', keyword: '', class: name, token: token }))
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

      <div className="pagination">
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

function PaginateItems({ currentItems = [], type = '' }) {
  let list = []
  if (currentItems?.length) {
    list = currentItems.map(item => {
      let key = ''
      let title = ''

      switch (type) {
        case 'scenicSpot': {
          const { ScenicSpotID, ScenicSpotName } = item
          key = ScenicSpotID
          title = ScenicSpotName
          break
        }

        case 'restaurant': {
          const { RestaurantID, RestaurantName } = item
          key = RestaurantID
          title = RestaurantName
          break
        }

        case 'activity': {
          const { ActivityID, ActivityName } = item
          key = ActivityID
          title = ActivityName
          break
        }
        default: {
          break
        }
      }
      return <ProductCard key={key} id={key} title={title} item={item} type={type} />
    })
  } else {
    return null
  }

  return <>{list}</>
}

export default Attractions
