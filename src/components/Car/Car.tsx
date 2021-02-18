import React from 'react'
import styles from './Car.module.css'
import imageNotFound from '../../assets/images/notfound.jpg'

interface CarProps {
  id: number,
  description: string,
  model: string,
  imageURL: string,
  estimateDate: string,
  make: string
}

const ImageContainer = ({ src, alt }: { src: string, alt: string }) => {
  const onErrorImg = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    const target = e.target as HTMLImageElement
    target.onerror = null
    target.src = imageNotFound
  }
  return (
    <div className={styles.ImageContainer}>
      <img
        src={src}
        alt={alt}
        onError={onErrorImg}
      />
    </div>
  )
}

const Car = (data: CarProps) => {
  const {
    description,
    estimateDate,
    id,
    imageURL,
    make,
    model,
  } = data
  return (
    <div className={styles.CarContainer}>
      <ImageContainer
        src={imageURL}
        alt={imageURL}
      />
      <p><span className={styles.SpanLabel}>Id: </span> {id}</p>
      <p><span className={styles.SpanLabel}>Marca: </span> {make}</p>
      <p><span className={styles.SpanLabel}>Modelo: </span> {model}</p>
      <p><span className={styles.SpanLabel}>Descripcion: </span> {description}</p>
      <p><span className={styles.SpanLabel}>Fecha: </span> {estimateDate}</p>
    </div>
  )
}

export default Car
