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
          <Link
            href={{
              pathname: '/attractions',
              query: { type: 'scenicSpot' },
            }}
          >
            探索景點
          </Link>
        </div>
        <div>
          <Link
            href={{
              pathname: '/attractions',
              query: { type: 'activity' },
            }}
          >
            節慶活動
          </Link>
        </div>
        <div>
          <Link
            href={{
              pathname: '/attractions',
              query: { type: 'restaurant' },
            }}
          >
            品嚐美食
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Header
