import { mergeData } from 'vue-functional-data-merge'

// const COMMON_ALIGNMENT = ['start', 'end', 'center']

// Generates a prop object with a type of `[String, Number]`
// const strNum = () => ({
//   type: [String, Number],
//   default: null
// })

// Lazy evaled props factory for <b-row> (called only once,
// the first time the component is used)
const generateProps = () => {
  // Return the generated props
  return {
    tag: {
      type: String,
      default: 'div'
    },
    noGutters: {
      type: Boolean,
      default: false
    },
    alignV: {
      type: String,
      default: null
    },
    alignH: {
      type: String,
      default: null
    },
    alignContent: {
      type: String,
      default: null
    }
  }
}

// @vue/component
export const Row = {
  name: 'Row',
  functional: true,
  get props () {
    delete this.props
    this.props = generateProps()
    return this.props
  },
  render (h, { props, data, children }) {
    const classList = []
    classList.push({
      'no-gutters': props.noGutters,
      [`align-items-${props.alignV}`]: props.alignV,
      [`justify-content-${props.alignH}`]: props.alignH,
      [`align-content-${props.alignContent}`]: props.alignContent
    })
    return h(props.tag, mergeData(data, { staticClass: 'row', class: classList }), children)
  }
}
