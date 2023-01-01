import React from 'react'
import { useSelector } from 'react-redux'

import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { FiMapPin } from 'react-icons/fi'

import { getCityCode } from '../../utils/cityCode'
// Styles And Icons
import styles from './index.module.scss'

const ProductCard = ({ id, title, item, type }) => {
  const { Picture = '', City = '' } = item

  const { isLoading } = useSelector(state => state.AttractionsReducers)

  let mainPictureUrl = ''
  if (Picture) {
    const { PictureUrl1 = '' } = Picture
    mainPictureUrl = PictureUrl1
  }

  const goIntroduction = item => {
    // const { ID } = item
    window.location.href = `/introduction?type=${type}&ID=${id}`
  }

  const getLocationResults = cityName => {
    const code = getCityCode(cityName)
    window.location.href = `/attractions?type=${type}&city=${code}`
  }

  return (
    <div className={styles.card}>
      {isLoading ? (
        <Skeleton width={255} height={200} />
      ) : (
        <div
          className={styles.mainPicture}
          style={{ backgroundImage: `url(${mainPictureUrl}),url('/images/NoImage-255x200.svg')` }}
          onClick={() => {
            goIntroduction(item)
          }}
        ></div>
      )}

      <div>
        {isLoading ? (
          <Skeleton height={36} />
        ) : (
          <>
            <div
              className={styles.name}
              onClick={() => {
                goIntroduction(item)
              }}
            >
              {title}
            </div>
            <div
              className={styles.city}
              onClick={() => {
                getLocationResults(City)
              }}
            >
              <FiMapPin />
              {City}
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default ProductCard
