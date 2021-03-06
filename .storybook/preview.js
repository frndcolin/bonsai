import Vue from 'vue'
// import Vuex from 'vuex'
import { addDecorator } from '@storybook/vue'
import { withKnobs } from '@storybook/addon-knobs'
import { withInfo } from 'storybook-addon-vue-info'
// import { action } from '@storybook/addon-actions'

// -- in the event that you are using vuex, this line adds it as a dependency to vue
// Vue.use(Vuex)
// -- removes all productionTip logs from the console when running storybook
Vue.config.productionTip = false
// -- overrides nuxt-link native functionality in order to avoid navigating to an actual page
// Vue.component('nuxt-link', {
//   props: ['to'],
//   methods: {
//     log() {
//       action('link target')(this.to)
//     },
//   },
//   template: 'NuxtLink',
// })

// -- adds the info tab to your story
addDecorator(withInfo)
// -- adds the knob tab to your story, this allows you to play around with your component
addDecorator(withKnobs)

// -- tells storybook where to look for stories
// configure(function () {
//   const req = require.context('../src/components/**', true, /\.stories\.js$/)
//   req.keys().forEach(filename => req(filename))
// }, module)
