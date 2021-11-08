import React, { useEffect, useRef, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import PropTypes from 'prop-types'

import * as AttractionsActions from '../../redux/actions/AttractionsActions'

// Styles And Icons
import styles from './index.module.scss'

import Carousel from '../../components/Carousel'

const Home = () => {
  return (
    <div>
      <div className={styles.topic}>
        <div className={styles.slogan}>探索台灣之美 讓我們更親近這片土地</div>
        <div className={styles.search}>{/* <SearchBar /> */}</div>
      </div>

      <Carousel />
    </div>
  )
}

export default Home
