import React from 'react'
import { Link } from 'next/link'
import styles from './index.module.scss'

const Breadcrumbs = ({ items }) => {
  const redirectPage = path => {
    window.location.href = path
  }
  return (
    <div className={styles.breadcrumbs}>
      {items.map(item => {
        return (
          <div
            key={item.label}
            className={styles.item}
            onClick={() => {
              redirectPage(item.path)
            }}
          >
            {item.label}
          </div>
        )
      })}
    </div>
  )
}

export default Breadcrumbs
