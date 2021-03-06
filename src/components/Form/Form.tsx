import React, { useState } from 'react'
import {carsApi} from '../../utils/apis'
import styles from './Form.module.css'

interface FormProps {
  carId: number
}

const Form = (props: FormProps) => {

  const [user, setUser] = useState('')
  const [userError, setUserError] = useState(false)
  const [dateError, setDateError] = useState(false)
  const [startDate, setStartDate] = useState('')
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [fail, setFail] = useState(false)
  const [successMessage, setSuccessMessage] = useState('')
  const [failMessage, setFailMessage] = useState('')
  let spanUserError
  let spanDateError
  if (userError) {
    spanUserError = <span style={{color: 'red'}}>Ingrea una Persona</span>
  }
  if (dateError) {
    spanDateError = <span style={{color: 'red'}}>Ingresa la fecha</span>
  }
  
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!user) {
      setUserError(true)
      return
    } else {
      setUserError(false)
    }
    if (!startDate) {
      setDateError(true)
      return
    } else {
      setDateError(false)
    }
    const body = {
      user,
      estimateDate: startDate,
      carId: props.carId
    }
    try {
      setLoading(true)
      const response = await carsApi.post('/user', body)
      console.log(response)
      const { data } = response
      const userData = data.user
      setSuccess(true)
      setSuccessMessage(`El usuario ${userData.user} se ha guardado exitosamente. con fecha estimada ${userData.estimateDate.split('T')[0]} para el carro con id: ${userData.carId}`)
    } catch (error) {
      console.log(error.response)
      const errorMessage = error.response?.data?.message || error.message
      setFail(true)
      setFailMessage(errorMessage)
    } finally {
      setLoading(false)
    }
  }
  
  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { target } = e
    let { value } = target
    if (value.length > 10) {
      return
    }
    if ((value.length === 4 && startDate.length <5) || (value.length === 7 && startDate.length <8)) {
      value += '/'
    }
    setStartDate(value)
  }
  if (loading) {
    return ( <div className={styles.loader}></div>)
  }

  if (success) {
    return ( 
      <div>
        <p>{successMessage}</p>
      </div>
    )
  }
  if (fail) {
    return (
      <div>
        <p style={{color: 'red'}}>{failMessage}</p>
      </div>
    )
  }
  return (
    <form onSubmit={handleSubmit} className={styles.FormContainer}>
      <div className={styles.FormGroup}>
        <input
          type="text"
          id="persona"
          placeholder="Persona..."
          onChange={(e) => {setUser(e.target.value)}}
        />
      </div>
      {spanUserError}
      <div className={styles.FormGroup}>
        <input
          type="text"
          id="date"
          placeholder="yyyy/mm/dd"
          value={startDate}
          onChange={handleDateChange}
        />
      </div>
      {spanDateError}

      <button className={styles.button} type="submit">Guardar</button>
    </form>
  )
}


export default Form