import { mergeData } from 'vue-functional-data-merge'

const strNum = () => ({ type: [String, Number], default: null })
const numList = ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten', 'eleven', 'twelve']
const getColClass = (num) => numList[Number(num)]

const createProps = () => {
  return {
    xs: strNum(),
    sm: strNum(),
    md: strNum(),
    lg: strNum(),
    xl: strNum(),
    columns: strNum(),
    offset: strNum(),
    tag: { type: String, default: 'div' },
    align: { type: String, default: null },
    vAlign: { type: String, default: null },
    hAlign: { type: String, default: null },
    debug: { type: Boolean, default: false }
  }
}

export const Column = {
  name: 'Column',
  functional: true,
  get props () {
    delete this.props
    return (this.props = createProps())
  },
  render (c, { props, data, children }) {
    const classes = [{
      [`${getColClass(props.columns)}`]: props.columns,
      [`xs-${getColClass(props.xs)}`]: props.xs,
      [`sm-${getColClass(props.sm)}`]: props.sm,
      [`md-${getColClass(props.md)}`]: props.md,
      [`lg-${getColClass(props.lg)}`]: props.lg,
      [`xl-${getColClass(props.xl)}`]: props.xl,
      [`offset-by-${getColClass(props.offset)}`]: props.offset,
      [`align--${props.align}`]: props.align,
      [`h-align--${props.hAlign}`]: props.hAlign,
      [`v-align--${props.vAlign}`]: props.vAlign
    }]

    return c(
      props.tag,
      mergeData(data, { class: [...classes], staticClass: 'column' }),
      children
    )
  }
}
