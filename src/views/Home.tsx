import React, { useState, useEffect } from 'react'
import {carsApi} from '../utils/apis'

const Home = () => {
  const [cars, setCars] = useState([])
  const [loading, setLoading] = useState(true)
  const [errorGetCar, setErrorGetCar] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  useEffect(() => {
    const fetchCars = async () => {
      try {
        const result = await carsApi.get('/car')
        const { data } = result
        setCars(data)
      } catch (error) {
        console.log(error.message)
        setErrorGetCar(true)
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
  return (
    <div>
      <p>holiwi</p>
    </div>
  )
}


export default Home
