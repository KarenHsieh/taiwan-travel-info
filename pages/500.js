import Head from 'next/head'
import styles from './500.module.css'

export default function Custom500() {
  return (
    <>
      <Head>
        <link
          href="https://maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css"
          rel="stylesheet"
        ></link>
      </Head>

      <div className={styles.page404}>
        <div className={styles.outer}>
          <div className={styles.middle}>
            <div className={styles.inner}>
              <div className={styles.innerCircle}>
                {/* <i className="fa fa-cogs"></i> */}
                <span>500</span>
              </div>
              <span className={styles.innerStatus}>Opps！ API目前似乎無法運作，請稍後再試！</span>
              <span className={styles.innerDetail}>
                有可能是目前的瀏覽已達每日API可使用量上限，很抱歉造成您的不便，請明天再回來看看，謝謝！
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
