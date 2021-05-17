import * as Vue from 'vue'
import components from '../components'
import FaceMatching from '../pages/FaceMatching.vue'
import Liveness from '../pages/Liveness.vue'
import '../styles/index.scss'

const createApp = () =>
  Vue.createApp({
    template: `<div class="openbio-websdk-base">
          <FaceMatching v-if="component === 'facematching' && !loading" />
          <Liveness v-if="component === 'liveness' && !loading" />
          <div v-if="loading"><span>Loading</span></div>
        </div>`,
    data() {
      return {
        component: 'facematching',
        loading: true,
      }
    },
    components: {
      FaceMatching,
      Liveness,
    },
    mounted() {
      this.loaded()
    },
    methods: {
      loaded() {
        this.loading = false
      },
    },
  })

export const app = () => {
  const newApp = createApp()
  Object.entries(components).forEach(([key, component]) => {
    newApp.component(key, component)
  })
  return newApp
}
