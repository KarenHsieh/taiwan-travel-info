import React, { useEffect, useRef, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import PropTypes from 'prop-types'

import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

// Styles And Icons
import styles from './index.module.scss'

const ProductCard = ({ item }) => {
  const { Name, Picture = '', City = '', Class1 = '', Class2 = '', Class3 = '' } = item

  const { resultList, isLoading } = useSelector(state => state.AttractionsReducers)

  let mainPictureUrl = ''
  if (Picture) {
    const { PictureUrl1 = '', PictureDescription1 = '' } = Picture
    mainPictureUrl = PictureUrl1
  }
  return (
    <div className={styles.card}>
      {isLoading ? (
        <Skeleton width={255} height={200} />
      ) : (
        <div
          className={styles.mainPicture}
          style={{ backgroundImage: `url(${mainPictureUrl}),url('/images/NoImage-255x200.svg')` }}
        ></div>
      )}

      <div>
        {isLoading ? (
          <Skeleton count={2} height={16} />
        ) : (
          <>
            <div className={styles.name}>{Name}</div>
            <div className={styles.city}>{City}</div>
          </>
        )}
      </div>
    </div>
  )
}

export default ProductCard
