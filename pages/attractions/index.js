import React, { useEffect, useRef, useState } from 'react'
import PropTypes from 'prop-types'

// Styles And Icons
import styles from './index.module.scss'

const Attractions = () => {
  return (
    <div>
      <SearchBar />
    </div>
  );
};

export default Attractions;


const SearchBar = () => {
  return (
    <div>
      <div>
      <input className={styles.searchInput} type="text" />
      <button className={styles.searchButton} type="button">搜尋</button>
      </div>
      <div>
      <button className={styles.filterButton} type="button">景點</button>
      <button className={styles.filterButton} type="button">餐飲</button>
      <button className={styles.filterButton} type="button">旅宿</button>
      <button className={styles.filterButton} type="button">活動</button>
      </div>
    </div>
  )
}