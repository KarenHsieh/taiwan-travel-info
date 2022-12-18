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
        {/* <link rel="shortcut icon" href="https://static.cdn-eztravel.com/assets/images/common/logo.jpg" /> */}
        <meta property="og:title" content={'台灣走走'} />
        <meta property="og:description" content={'探索台灣之美 - 讓我們更親近這片土地 - 台灣旅遊景點導覽'} />
        {/* <meta property="og:type" content={ogType} />
        <meta property="og:image" content={ogImage} />
        <meta property="og:url" content={ogUrl} />
        <meta property="og:site_name" content={ogSiteName} /> */}
      </Header>
      <main className={styles.container}>{children}</main>
      <Footer />
    </div>
  )
}

export default Layout
