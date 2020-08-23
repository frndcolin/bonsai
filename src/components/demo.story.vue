<template lang='pug'>
  #page
    main
      section
        .container
          .row
            .columns.one(v-for='i in 12' :key='i')
              .demo-block one
          .row
            .columns.two(v-for='i in 6' :key='i')
              .demo-block two
          .row
            .columns.three
              .demo-block
                bonsai-button Click me
            .columns.three
              .demo-block
                bonsai-button.ghost Click me
            .columns.three
              .demo-block
                bonsai-button.ghost.borderless Click me
            .columns.three
              .demo-block
                bonsai-button.subtle Click me
          .row
            .columns.four(v-for='i in 3' :key='i')
              .demo-block four
          .row
            .columns.six(v-for='i in 2' :key='i')
              .demo-block six
</template>

<script>
import BonsaiButton from './button/Button'

export default {
  components: { BonsaiButton }
}
</script>

<style lang='stylus'>
@import '../styl/index.styl'

.demo-block
  background #efefef
  padding 16px 0
  display flex
  justify-content center
  align-items center

</style>
