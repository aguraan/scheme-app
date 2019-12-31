import axios from 'axios'
import store from '@/store'
import { LOADING_START, LOADING_END, SNACKBAR_ERROR } from '@/mutation.types'

const Api = axios.create({
    baseURL: 'http://localhost:3000/auth',
    withCredentials: false
})

Api.interceptors.request.use(config => {
    store.commit(LOADING_START)
    return config
})

Api.interceptors.response.use(response => {

    store.commit(LOADING_END)
    console.log('Success', response.data)

    return response
}, error => {

    store.commit(LOADING_END)
    const { response: { data }, message } = error
    const text = (data && data.message) || message
    store.commit(SNACKBAR_ERROR, { text })
    console.error(error)

    return Promise.reject(error)
})

export default Api