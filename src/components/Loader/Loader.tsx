import React from 'react'
import styles from './Loader.module.css'

const Loader = () => {
  return (
    <div className={styles.LoaderContainer}>
      <div className={styles.loader} >
        Cargando....
      </div>
    </div>
  )
}

export default Loader