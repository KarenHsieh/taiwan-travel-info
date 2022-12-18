import React from 'react'
import { useSelector } from 'react-redux'

import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

// Styles And Icons
import styles from './index.module.scss'

const ProductCard = ({ item, type }) => {
  const { ScenicSpotName, Picture = '', City = '' } = item

  const { isLoading } = useSelector(state => state.AttractionsReducers)

  let mainPictureUrl = ''
  if (Picture) {
    const { PictureUrl1 = '' } = Picture
    mainPictureUrl = PictureUrl1
  }

  const goIntroduction = item => {
    const { ID } = item
    window.location.href = `/introduction?type=${type}&ID=${ID}`
  }

  return (
    <div
      className={styles.card}
      onClick={() => {
        goIntroduction(item)
      }}
    >
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
          <Skeleton height={36} />
        ) : (
          <>
            <div className={styles.name}>{ScenicSpotName}</div>
            <div className={styles.city}>{City}</div>
          </>
        )}
      </div>
    </div>
  )
}

export default ProductCard
