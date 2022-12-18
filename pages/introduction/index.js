/* eslint-disable jsx-a11y/iframe-has-title */
import React from 'react'

import { useRouter } from 'next/router'
import PropTypes from 'prop-types'

// Component
import Carousel from '../../components/Carousel'
import Breadcrumb from '../../components/Breadcrumb'
import Select from 'react-select'

import { formatDate } from '../../server/utils/tools'
import { axiosCall } from '../../server/utils/axios'

// Styles And Icons
import styles from './index.module.scss'

const pathname = {
  scenicSpot: '探索景點',
  activity: '節慶活動',
  restaurant: '品嚐美食',
}

const Introduction = ({ introduction = {}, fetchDataError = false }) => {
  const router = useRouter()
  const { type } = router.query

  const {
    ID,
    Name,
    DescriptionDetail = '',
    Picture = {},
    Class1 = '',
    Class2 = '',
    Class3 = '',
    Phone = '',
    Address = '',
    Position = '',
    Organizer = '',
    WebsiteUrl = '',
    Remarks = '',
    OpenTime = '',
    StartTime = '',
    EndTime = '',
  } = introduction

  const { PictureUrl1 = '', PictureDescription1 = '' } = Picture
  const { PositionLon = '', PositionLat = '' } = Position

  const breadcrumb = [
    {
      label: '首頁',
      path: '/home',
    },
    {
      label: pathname[type],
      path: `/attractions/${type}`,
    },
    {
      label: Name,
    },
  ]

  const mapUrl =
    PositionLon && PositionLat
      ? `https://www.google.com/maps?q=${PositionLat},${PositionLon}&hl=zh-TW&z=16&output=embed`
      : ''

  return (
    <div>
      <Breadcrumb items={breadcrumb} />
      <div
        className={styles.mainImage}
        style={{ backgroundImage: `url(${PictureUrl1}), url(${'/images/NoImage-1100x400.svg'})` }}
      ></div>
      <div className={styles.detail}>
        <div className={styles.name}>{Name}</div>
        {Class1 || Class2 || Class3 ? (
          <div className={styles.class}>
            {Class1 && <div>{Class1}</div>}
            {Class2 && <div>{Class2}</div>}
            {Class3 && <div>{Class3}</div>}
          </div>
        ) : null}

        {DescriptionDetail && <div className={styles.description}>{DescriptionDetail}</div>}

        <div className={styles.extraData}>
          <div className={styles.contact}>
            {OpenTime && (
              <div>
                <b>營業時間：</b>
                {OpenTime}
              </div>
            )}
            {StartTime && EndTime && (
              <div>
                <b>活動時間：</b>
                {`${formatDate(StartTime)} 至 ${formatDate(EndTime)}`}
              </div>
            )}
            {Phone && (
              <div>
                <b>聯絡電話：</b>
                {Phone}
              </div>
            )}
            {Address && (
              <div>
                <b>地址：</b>
                {Address}
              </div>
            )}
            {Organizer && (
              <div>
                <b>主辦單位：</b>
                {Organizer}
              </div>
            )}
            {WebsiteUrl && (
              <div>
                <b>官方網站：</b>
                {WebsiteUrl}
              </div>
            )}
            {Remarks && (
              <div>
                <b>備註：</b>
                {Remarks}
              </div>
            )}
          </div>
          <div className={styles.map}>
            {mapUrl && <iframe width="540" height="250" frameborder="0" src={mapUrl}></iframe>}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Introduction

export const getServerSideProps = async ctx => {
  const { type, ID } = ctx.query

  const apiBaseUri = 'https://ptx.transportdata.tw/MOTC/v2/'
  const uri = {
    scenicSpot: `${apiBaseUri}Tourism/ScenicSpot`,
    restaurant: `${apiBaseUri}Tourism/Restaurant`,
    hotel: `${apiBaseUri}Tourism/Hotel`,
    activity: `${apiBaseUri}Tourism/Activity`,
  }

  console.log(`${uri[type]}?$filter=ID eq '${ID}'&$format=JSON`)

  try {
    const { data: introduction } = await axiosCall({
      method: 'GET',
      url: `${uri[type]}?$filter=ID eq '${ID}'&$format=JSON`,
    })

    if (introduction.length) {
      return {
        props: { introduction: introduction[0] },
      }
    } else {
      return {
        props: { fetchDataError: true },
      }
    }
  } catch (error) {
    console.error(`network fetch error - ${error.message}`)
    return {
      props: { fetchDataError: true },
    }
  }
}
