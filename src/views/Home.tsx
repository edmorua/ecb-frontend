import React, { useState, useEffect } from 'react'
import {carsApi} from '../utils/apis'
import Loader from '../components/Loader/Loader'
import Car from '../components/Car/Car'
import styles from './Home.module.css'
import CustomModal from '../components/Modal/Modal'
import Form from '../components/Form/Form'
interface CarData {
  id: number,
  description: string,
  model: string,
  image: string,
  estimatedate: string,
  make: string
}

const Home = () => {
  const [cars, setCars] = useState<Array<CarData>>([])
  const [loading, setLoading] = useState(true)
  const [errorGetCar, setErrorGetCar] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [cardId, setCardId] = useState(0)
  const [openModal, setOpenModal] = useState(false)
  useEffect(() => {
    const fetchCars = async () => {
      try {
        const result = await carsApi.get('/car')
        const { data } = result
        setCars(data)
      } catch (error) {
        console.log(error.message)
        setErrorGetCar(true)
        setErrorMessage(error.message || 'NOT FOUND')
      } finally {
        setLoading(false)
      }
    }
    fetchCars()
  }, [])
  if (loading) {
    return (
      <Loader />
    )
  }

  if (errorGetCar) {
    return (
      <div>
        <h1>{errorMessage}</h1>
      </div>
    )
  }

  const closeModal = () => {
    setOpenModal(false)
  }

  const handleClickCar = (evt: React.MouseEvent<HTMLDivElement, MouseEvent>, cardId: number) => {
    evt.preventDefault()
    const target = document.getElementById(cardId.toString())
    if(target) {
      target.style.backgroundColor = "DarkTurquoise"
    }
    setOpenModal(true)
    setCardId(cardId)
  }
  const carList = cars.map((car) => {
    return (
      <div
        className={styles.CarContainer}
        onClick={(e) => { handleClickCar(e, car.id) }}
        id={car.id.toString()}
        key={car.id}
      >
        <Car
        description={car.description}
        id={car.id}
        make={car.make}
        imageURL={car.image}
        estimateDate={car.estimatedate}
        model={car.model}
        key={car.id}
        />
      </div>
    )
  })
  return (
    <div className={styles.HomeContainer}>
      {carList}
      <CustomModal
        isOpen={openModal}
        onRequestClose={closeModal}
        contentLabel="Agregar Usuario"
      >
        <Form
          carId={cardId}
        />
        <hr className={styles.line}></hr>
        <button className={styles.button} onClick={closeModal}>Cerrar</button>
      </CustomModal> 
    </div>
  )
}


export default Home
