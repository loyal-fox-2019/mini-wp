export default function(error, vm) {
  if (error.response) {
    // The request was made and the server responded with a status code
    // that falls out of the range of 2xx
    console.log(error.response.data)
    console.log(error.response.status)
    console.log(error.response.headers)
    const message = error.response.data.errors
      ? error.response.data.errors
      : 'Please refresh the browser'
    vm.$bvToast.toast(message, {
      title: 'Error happened',
      autoHideDelay: 3000,
      appendToast: true,
      solid: true,
      variant: 'danger',
    })
  } else if (error.request) {
    // The request was made but no response was received
    // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
    // http.ClientRequest in node.js
    console.log(error.request)
    vm.$bvToast.toast('Please refresh the browser', {
      title: 'Error happened',
      autoHideDelay: 3000,
      appendToast: true,
      solid: true,
      variant: 'danger',
    })
  } else {
    // Something happened in setting up the request that triggered an Error
    console.log('Error', error.message)
    vm.$bvToast.toast('Please refresh the browser', {
      title: 'Error happened',
      autoHideDelay: 3000,
      appendToast: true,
      solid: true,
      variant: 'danger',
    })
  }
  console.log(error.config)
}
