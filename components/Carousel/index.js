import React from 'react'
import Slider from 'react-slick'

import styles from './index.module.scss'

import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

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
        <div
          className={styles.item}
          onClick={() => {
            window.open('/introduction?type=scenicSpot&ID=C1_315081600H_000152', '_blank')
          }}
        >
          <div className={styles.title}>台南市 ｜ 北門鹽場</div>
          <img src="banner/banner1.jpg" alt="banner" />
        </div>
        <div
          className={styles.item}
          onClick={() => {
            window.open('/introduction?type=scenicSpot&ID=C1_379000000A_000117', '_blank')
          }}
        >
          <div className={styles.title}>新北市 ｜ 平溪天燈</div>
          <img src="banner/banner2.jpg" alt="banner" />
        </div>
        <div
          className={styles.item}
          onClick={() => {
            window.open('/introduction?type=scenicSpot&ID=C1_379000000A_000011', '_blank')
          }}
        >
          <div className={styles.title}>台北市 ｜ 新北投溫泉區</div>
          <img src="banner/banner3.jpg" alt="banner" />
        </div>
        <div
          className={styles.item}
          onClick={() => {
            window.open('/introduction?type=scenicSpot&ID=C1_315081600H_000084', '_blank')
          }}
        >
          <div className={styles.title}>台南市 ｜ 四草野生動物保護區</div>
          <img src="banner/banner4.jpg" alt="banner" />
        </div>
        <div
          className={styles.item}
          onClick={() => {
            window.open('/introduction?type=scenicSpot&ID=C1_382000000A_109735', '_blank')
          }}
        >
          <div className={styles.title}>新北市 ｜ 野柳地質公園</div>
          <img src="banner/banner5.jpg" alt="banner" />
        </div>
      </Slider>
    </div>
  )
}

export default Carousel
