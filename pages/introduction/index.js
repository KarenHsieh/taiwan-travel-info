/* eslint-disable jsx-a11y/iframe-has-title */
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { useSelector, useDispatch } from 'react-redux'
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

const Introduction = () => {
  const { type, apiToken, ID: productSeq } = useRouter().query

  const [introduction, setIntroduction] = useState({})
  // const [productId, setProductId] = useState('')
  const [productName, setProductName] = useState('')

  useEffect(() => {
    // let id = ''
    let name = ''

    switch (type) {
      case 'scenicSpot':
        // id = introduction.ScenicSpotID
        name = introduction.ScenicSpotName
        break
      case 'activity':
        // id = introduction.ActivityID
        name = introduction.ActivityName
        break
      case 'restaurant':
        // id = introduction.RestaurantID
        name = introduction.RestaurantName
        break
      default:
        break
    }
    // setProductId(id)
    setProductName(name)
  }, [introduction])

  useEffect(() => {
    // console.log('apiToken', apiToken)

    const apiBaseUri = 'https://tdx.transportdata.tw/api/basic/v2/'
    const uri = {
      scenicSpot: `${apiBaseUri}Tourism/ScenicSpot`,
      restaurant: `${apiBaseUri}Tourism/Restaurant`,
      hotel: `${apiBaseUri}Tourism/Hotel`,
      activity: `${apiBaseUri}Tourism/Activity`,
    }

    let url = uri[type]
    switch (type) {
      case 'scenicSpot': {
        url = `${url}?$filter=ScenicSpotID eq '${productSeq}'&$format=JSON`
        break
      }

      case 'restaurant': {
        url = `${url}?$filter=RestaurantID eq '${productSeq}'&$format=JSON`
        break
      }

      // case 'hotel': {
      //   url += `${url}?$filter=HotelID eq '${ID}'&$format=JSON`
      //   break
      // }

      case 'activity': {
        url = `${url}?$filter=ActivityID eq '${productSeq}'&$format=JSON`
        break
      }
      default: {
        // url = `${url}?$filter=ID eq '${productSeq}'&$format=JSON`
      }
    }
    console.log('url', url)

    getData(url)
    // }
  }, [type, apiToken])

  const getData = async url => {
    const { data: introduction } = await axiosCall(
      {
        method: 'GET',
        url: url,
      },
      apiToken
    )

    console.log('getData introduction', JSON.stringify(introduction))

    setIntroduction(introduction[0])
  }

  /*  const {
    ScenicSpotID: ID,
    ScenicSpotName: Name,
    Description = '',
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
    ParkingPosition = '',
  } = introduction */

  const { PictureUrl1 = '', PictureDescription1 = '' } = introduction?.Picture || {}
  const { PositionLon = '', PositionLat = '' } = introduction?.Position || {}

  const breadcrumb = [
    {
      label: '首頁',
      path: '/home',
    },
    {
      label: pathname[type],
      path: `/attractions?type=${type}`,
    },
    {
      label: productName,
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
        <div className={styles.name}>{introduction.productName}</div>
        {introduction?.Class1 || introduction?.Class2 || introduction?.Class3 ? (
          <div className={styles.class}>
            {introduction?.Class1 && <div>{introduction.Class1}</div>}
            {introduction?.Class2 && <div>{introduction.Class2}</div>}
            {introduction?.Class3 && <div>{introduction.Class3}</div>}
          </div>
        ) : null}

        {introduction?.Description && <div className={styles.description}>{introduction.Description}</div>}
        {!introduction?.Description && introduction?.DescriptionDetail && (
          <div className={styles.description}>{introduction.DescriptionDetail}</div>
        )}

        <div className={styles.extraData}>
          <div className={styles.contact}>
            {introduction?.OpenTime && (
              <div>
                <b>營業時間：</b>
                {introduction.OpenTime}
              </div>
            )}
            {introduction?.StartTime && introduction?.EndTime && (
              <div>
                <b>活動時間：</b>
                {`${formatDate(introduction.StartTime)} 至 ${formatDate(introduction.EndTime)}`}
              </div>
            )}
            {introduction?.Phone && (
              <div>
                <b>聯絡電話：</b>
                {introduction.Phone}
              </div>
            )}
            {introduction?.Address && (
              <div>
                <b>地址：</b>
                {introduction.Address}
              </div>
            )}
            {introduction?.Organizer && (
              <div>
                <b>主辦單位：</b>
                {introduction.Organizer}
              </div>
            )}
            {introduction?.WebsiteUrl && (
              <div>
                <b>官方網站：</b>
                {introduction.WebsiteUrl}
              </div>
            )}
            {introduction?.Remarks && (
              <div>
                <b>備註：</b>
                {introduction.Remarks}
              </div>
            )}
          </div>
          <div className={styles.map}>
            {mapUrl && <iframe width="540" height="250" frameBorder="0" src={mapUrl}></iframe>}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Introduction
