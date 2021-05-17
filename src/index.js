import { app } from './js/app'

let vm = null
let el = null
let newApp = null

function close() {
  if (el && document.body.contains(el)) {
    document.body.removeChild(el)
  }
  newApp.unmount()
  vm = null
}
const OpenbioWebSDK = {
  open(component, successCallback, errorCallback) {
    newApp = app()
    if (el === null) {
      el = document.createElement('div', {})
    }
    if (!el.classList.contains('openbio-websdk')) {
      el.classList.add('openbio-websdk')
    }
    if (!document.body.contains(el)) {
      document.body.append(el)
    }
    if (successCallback) {
      newApp.config.globalProperties.successCallback = function _(...args) {
        successCallback(args)
        close()
      }
    }
    if (errorCallback) {
      newApp.config.globalProperties.errorCallback = function _(...args) {
        errorCallback(args)
      }
    }
    console.log(`vm 1`, vm)
    if (vm === null) {
      vm = newApp.mount(el)
      console.log(`vm 2`, vm)
    } else {
      vm.$forceUpdate()
    }
    console.log(`vm 3`, vm)
    vm.component = component || 'facematching'
  },
  openLiveness(successCallback, errorCallback) {
    this.open('liveness', successCallback, errorCallback)
  },
  openFaceMatching(successCallback, errorCallback) {
    this.open('facematching', successCallback, errorCallback)
  },
}

window.OpenbioWebSDK = OpenbioWebSDK
