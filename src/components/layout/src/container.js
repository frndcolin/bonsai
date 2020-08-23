import { mergeData } from 'vue-functional-data-merge'

const props = {
  tag: { type: String, default: 'div' },
  fluid: { type: Boolean, default: false }
}

export const Container = {
  name: 'Container',
  functional: true,
  props,
  render (h, { props, data, children }) {
    return h(
      props.tag,
      mergeData(data, {
        staticClass: 'container',
        class: {
          'container-fluid': props.fluid === true
        }
      }),
      children
    )
  }
}
