import React from 'react'
import Slider from 'react-slick'

import styles from './index.module.scss'

import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

import Image from 'next/image'
import banner1 from '/public/banner/banner1.jpg'
import banner2 from '/public/banner/banner2.jpg'

// import Resizer from "react-image-file-resizer";

const Carousel = () => {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  }

  return (
    <div className={styles.carouselContainer}>
      <Slider {...settings}>
        <div>
          {/* 七股鹽田濕地 */}
          {/* $filter=contains(Name, '鹽田') */}
          <div className={styles.title}>台南市 ｜ 鹽田</div>
          <img src="banner/banner1.jpg" alt="banner" />
        </div>
        <div>
          <h3>新北市 ｜ 平溪天燈</h3>
          <img src="banner/banner2.jpg" alt="banner" />
        </div>
        <div>
          <h3>台北市 ｜ 北投圖書館</h3>
          <img src="banner/banner3.jpg" alt="banner" />
        </div>
        <div>
          <h3>台南市 ｜ 四草綠色隧道</h3>
          <img src="banner/banner4.jpg" alt="banner" />
        </div>
        <div>
          <h3>新北市 ｜ 野柳地質公園</h3>
          <img src="banner/banner5.jpg" alt="banner" />
        </div>
      </Slider>
    </div>
  )
}

export default Carousel
