import { isJSON } from '@/helpers'
export default {

  install (Vue, options = {}) {

    const { esUrl } = options

    if (!esUrl) throw new Error('Event Source Url must be provided!')

    const es = new EventSource(esUrl)
    const windowSize = {
      google: 'width=452,height=633',
      facebook: 'width=580,height=400'
    }
    let previousUrl = null

    Vue.prototype.$popup = {

      window: null,

      open (url) {
        const provider = url.split('/').pop()
        
        if (this.window === null || this.window.closed) {
          this.window = window.open(url, provider, windowSize[provider])
        } else if (previousUrl !== url) {
          this.window = window.open(url, provider, windowSize[provider])
          this.window.focus()
        } else {
          this.window.focus()
        }
        previousUrl = url

        return new Promise((resolve, reject) => {
          const resolveEvent = ({ data }) => {
            if (isJSON(data)) {
              resolve({ data: JSON.parse(data) })
            } else {
              resolve({ data })
            }
            es.removeEventListener('authResolve', resolveEvent)
          }
          const rejectEvent = ({ data }) => {
            if (isJSON(data)) {
              reject(JSON.parse(data))
            } else {
              reject(data)
            }
            es.removeEventListener('authReject', rejectEvent)
          }
          es.addEventListener('authResolve', resolveEvent)
          es.addEventListener('authReject', rejectEvent)
        })
      },
      close () {
        if (this.window && !this.window.closed) this.window.close()
      }
    }
  }
}
