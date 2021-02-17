import axios from 'axios'


const carsApi = axios.create({ baseURL: process.env.REACT_APP_CARS_API, timeout: 3000 });

export {
  carsApi
}