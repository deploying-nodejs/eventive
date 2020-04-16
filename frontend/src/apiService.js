import axios from 'axios'

export default class ApiService {
  constructor() {
    this.http = axios.create({
      baseURL: process.env.REACT_APP_API_URL
    })
  }

  getEvents = async () => {
    return this.http.get(`/events`)
  }

  storeEvent = async (event) => {
    return this.http.post(`/events`, event)
  }

  deleteEvent = async (id) => {
    return this.http.delete(`/events/${id}`)
  }
}
