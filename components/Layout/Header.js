import React from 'react'
import Link from 'next/link'

import Logo from '/public/icons/Logo-desktop.svg'

import styles from './index.module.scss'

const Header = () => {
  return (
    <div className={styles.header}>
      <div>
        <Link href="/home">
          <Logo />
        </Link>
      </div>
      <div className={styles.otherPage}>
        <div>
          <a href="/attractions?type=scenicSpot">探索景點</a>
        </div>
        <div>
          <a href="/attractions?type=activity">節慶活動</a>
        </div>
        <div>
          <a href="/attractions?type=restaurant">品嚐美食</a>
        </div>
      </div>
    </div>
  )
}

export default Header
