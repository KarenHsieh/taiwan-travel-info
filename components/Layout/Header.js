import React from 'react'
import Link from 'next/link'

import Logo from '/public/icons/Logo-desktop.svg'

import styles from './index.module.scss'

const Header = () => {
  return (
    <div className={styles.header}>
      <div>
        <Link href="/">
          <Logo />
        </Link>
      </div>
      <div className={styles.otherPage}>
        <div>探索景點</div>
        <div>節慶活動</div>
        <div>品嚐美食</div>
      </div>
    </div>
  )
}

export default Header
