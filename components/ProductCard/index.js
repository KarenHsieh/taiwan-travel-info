import React, { useEffect, useRef, useState } from 'react'
import PropTypes from 'prop-types'

// Styles And Icons
import styles from './index.module.scss'

const ProductCard = ({ item }) => {
  const { Name, Picture = '', City = '', Class1 = '', Class2 = '', Class3 = '' } = item

  let mainPictureUrl = ''
  if (Picture) {
    const { PictureUrl1 = '', PictureDescription1 = '' } = Picture
    mainPictureUrl = PictureUrl1
  }
  return (
    <div className={styles.card}>
      <div className={styles.mainPicture} style={{ backgroundImage: `url(${mainPictureUrl})` }}></div>
      <div>
        <div>{Name}</div>
        <div>{City}</div>
        <div>
          <span>{Class1}</span>
          <span>{Class2}</span>
          <span>{Class3}</span>
        </div>
      </div>
    </div>
  )
}

export default ProductCard
