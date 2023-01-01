import React from 'react'

import Header from './Header'
import Footer from './Footer'

import styles from './index.module.scss'

const Layout = ({ children }) => {
  return (
    <div className={styles.document}>
      <Header>
        <title>台灣走走</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="description" content={'探索台灣之美 - 讓我們更親近這片土地 - 台灣旅遊景點導覽'} />
        <meta property="og:title" content={'台灣走走'} />
        <meta property="og:description" content={'探索台灣之美 - 讓我們更親近這片土地 - 台灣旅遊景點導覽'} />
      </Header>
      <main className={styles.container}>{children}</main>
      <Footer />
    </div>
  )
}

export default Layout
